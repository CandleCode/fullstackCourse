describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test user',
      username: 'test username',
      password: 'test password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test username')
      cy.get('#password').type('test password')
      cy.get('#login-button').click()
      cy.contains('test user successfully logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong username')
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test username', password: 'test password' })
    })

    it('A blog can be created', function() {
      cy.get('#new-blog-button').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submit-button').click()
      cy.contains('test title test author')
    })

    describe('When blogs are already added', function() {
      beforeEach(function() {
        const blog1 = {
          title: 'blog title 1',
          author: 'blog author 1',
          url: 'blog url 1'
        }
        const blog2 = {
          title: 'blog title 2',
          author: 'blog author 2',
          url: 'blog url 2'
        }
        cy.createBlog(blog1)
        cy.createBlog(blog2)
        const user = {
          name: 'test user 2',
          username: 'test username 2',
          password: 'test password 2'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
      })

      it('A blog can be liked', function() {
        cy.contains('blog title 1 blog author 1').contains('view').click()
        cy.contains('like').click().parent().should('contain','1')
      })
      it('A blog can be deleted by the user', function() {
        cy.contains('blog title 1 blog author 1').contains('view').click()
        cy.contains('remove').click()
        cy.contains('blog title 1 blog author 1').should('not.exist')
      })
      it('A blog can not be deleted by another user', function() {
        cy.contains('log out').click()
        cy.login({ username: 'test username 2', password: 'test password 2' })
        cy.contains('blog title 1 blog author 1').contains('view').click()
        cy.contains('remove').should('not.be.visible')
      })
      it('Blogs are ordered according to likes', function() {
        cy.contains('blog title 1 blog author 1').contains('view').click()
        cy.contains('like').click().parent().should('contain','1')
        cy.contains('like').click().parent().should('contain','2')
        cy.contains('blog title 2 blog author 2').contains('view').click()
        cy.get('.blog').eq(1).contains('like').click().parent().should('contain', '1')
          .contains('like').click().parent().should('contain', '2')
          .contains('like').click().parent().should('contain', '3')
        cy.get('.blog').eq(0).should('contain', 'blog title 2 blog author 2')
      })
    })
  })
})
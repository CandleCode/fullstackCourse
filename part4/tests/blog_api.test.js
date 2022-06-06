const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require("./test_helper")
const User = require('../models/user')



beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
    await User.deleteMany({})
    let user = await new User(helper.initialUser)
    user.save()

}, 10000)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)

}, 10000)

test('blog id is not _id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined();
}, 10000)

describe('post blog', () => {
    test(' and check total number and that the title is found', async () => {
        const newBlog = {
            title: 'new title',
            author: 'test author',
            url: '// test url',
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ 'Authorization': helper.initialUserToken })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const allBlogs = await helper.blogsInDb()
        expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
        const title = allBlogs.map(n => n.title)
        expect(title).toContain('new title')
    })
    test(' and verify that likes defaults to 0 if it is missing from request', async () => {
        const newBlog = {
            title: 'new title',
            author: 'test author',
            url: '// test url',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ 'Authorization': helper.initialUserToken })
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const allBlogs = await helper.blogsInDb()
        expect(allBlogs[6].likes).toBe(0)
    })
    test(' and verify that post returns 404 if title or url are not being sent', async () => {
        const newBlog = {
            author:'test author',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
    test(' and verify that post returns 401 if token is not provided', async () => {
        const newBlog = {
            title: 'new title',
            author: 'test author',
            url: '// test url',
            likes: 1
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

test.only('delete blog and check that it has been deleted', async () => {
    await api
        .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .set({ 'Authorization': helper.initialUserToken })
        .expect(204)
    const allBlogs = await helper.blogsInDb()
    expect(allBlogs.length).toBe(5)
},10000)

test('update blog and check that it has been updated', async () => {
    const newBlog = {
        title: 'new title',
        author: 'test author',
        url: '// test url',
        likes: 5
    }
    await api
        .put(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .send(newBlog)
        .expect(200)
    const allBlogs = await helper.blogsInDb()
    expect(allBlogs[0].title).toBe('new title')
})





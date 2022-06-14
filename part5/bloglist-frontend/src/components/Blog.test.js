import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
describe('test Blog ', () => {
  const blog = {
    user: {
      username:'test username',
      name:'test name',
      id:543533
    },
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 3
  }

  const testUser = {
    username:'test username',
    name:'test name',
    id:543533
  }
  test('render blog, title, and author but not render url or likes', () => {

    const { container } = render (<Blog blog={blog} user={testUser}/>)

    const div = container.querySelector('.blogText')
    expect(div).toHaveTextContent('test title')
    expect(div).toHaveTextContent('test author')
    expect(div).not.toHaveStyle('display: none')
    const div2 = container.querySelector('.blogTextFull')
    expect(div2).toHaveStyle('display: none')
  })
  test('check that blog url and likes are shown when button is pressed', async () => {

    const mockHandler = jest.fn()

    const { container } = render (<Blog blog={blog} user={testUser} handleUpdate={mockHandler}/>)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div2 = container.querySelector('.blogTextFull')
    expect(div2).toHaveTextContent(blog.likes)
    expect(div2).toHaveTextContent(blog.url)
    expect(div2).not.toHaveStyle('display: none')

  })
  test('check that if like button is clicked twice the event handler is called twice', async () => {

    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={testUser} handleUpdate={mockHandler}/>)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('test that BlogForm calls the eventhandler it recieves with the right details when a new blog is created ', async () => {

  const mockHandler = jest.fn()
  const user = userEvent.setup()
  const newBlog = { title: 'test title', author:'test author', url: 'test url' }
  render(<BlogForm addBlog={mockHandler}/>)

  const inputs = screen.getAllByRole('textbox')
  const button = screen.getByText('submit')
  await user.type(inputs[0], newBlog.title)
  await user.type(inputs[1], newBlog.author)
  await user.type(inputs[2], newBlog.url)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toEqual(newBlog)
})
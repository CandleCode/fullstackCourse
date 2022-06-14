import { useState } from 'react'

const Blog = ({ blog, handleUpdate, user, handleDelete }) => {
  const [blogFullView, setBlogFullView] = useState(false)
  const hideWhenVisible = { display: blogFullView ? 'none' : '' }
  const showWhenVisible = { display: blogFullView ? '' : 'none' }
  const showWhenSameUser= { display: (user.username === blog.user.username) ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDeleteClick = () => {
    if (window.confirm(`remove ${blog.title} ${blog.author} ?`)) {
      return handleDelete(blog.id)
    }
  }

  const handleLikeClick = () => {
    const newBlogObject = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    return handleUpdate(newBlogObject, blog.id)
  }
  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='blogText'>
        {blog.title} {blog.author}
        <button onClick={() => setBlogFullView(true)}>view</button>
      </div>
      <div style={showWhenVisible} className='blogTextFull'>
        {blog.title} {blog.author}
        <button onClick={() => setBlogFullView(false)}>hide</button>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={handleLikeClick}>like</button>
        </p>
        <p>{blog.author}</p>
        <button onClick={handleDeleteClick} style={showWhenSameUser}>remove</button>
      </div>
    </div>
  )
}

export default Blog
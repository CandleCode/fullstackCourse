import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({
    text: '',
    isError: false,
  })
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs.sort(sortFunction)))
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortFunction = (a, b) => {
    return b.likes - a.likes
  }

  const populateUser = (userId) => {
    return {
      id: userId,
      name: user.name,
      username: user.username
    }
  }
  /// i had to do this function otherwise remove button wouldn't appear because userID isn't populated in returnedBlog from post

  const notificationChange = (text, isError) => {
    setNotificationMessage({
      text: text,
      isError: isError,
    })
    setTimeout(() => {
      setNotificationMessage({ text: '', isError: false })
    }, 5000)
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
                    username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )


  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <button onClick={handleLogout}>log out</button>
      <h4> user {user.name} logged in</h4>
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog}/>
      </Toggleable>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} user={user}
        handleDelete={handleDelete}/>)}
    </div>
  )

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        returnedBlog.user= populateUser(returnedBlog.user)
        setBlogs(blogs.concat(returnedBlog))
        notificationChange(`a new blog ${returnedBlog.title} by ${returnedBlog.author} has been added`, false)
        blogFormRef.current.toggleVisibility()
      })
      .catch((error) => {
        console.log(error)
        notificationChange(error.response.data, true)
      })
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
    notificationChange('successfully logged out', false)
  }

  const handleDelete = async (id) => {
    await blogService.deleteObject(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const handleUpdate = async (blogToUpdate, blogId) => {
    await blogService.update(blogId, blogToUpdate)
    setBlogs(blogs.map(blog => {
      return (blog.id === blogId) ? { ...blog, likes: blog.likes + 1 } : blog
    }).sort(sortFunction))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notificationChange(`${user.name} successfully logged in`, false)
    } catch (exception) {
      notificationChange('Wrong username or password', true)
      setUsername('')
      setPassword('')
    }

  }

  return (
    <div>
      <Notification message={notificationMessage}/>
      {user === null ?
        loginForm() : blogList()
      }
    </div>
  )
}

export default App

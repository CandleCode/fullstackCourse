import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";

function App() {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState({
        text: "",
        isError: false,
    })
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    },[])

    const notificationChange = (text, isError) => {
        setNotificationMessage({
            text: text,
            isError: isError,
        });
        setTimeout(() => {
            setNotificationMessage({text: "", isError: false});
        }, 5000);
    };

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
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )

    const blogList = () => (
        <div>
            <h2>blogs</h2>
            <button onClick={handleLogout}>log out</button>
            <h4> user {user.name} logged in</h4>
            {blogs.map((blog) => <Blog key={blog.id} blog={blog}/>)}
            <h2>Create new blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({target}) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
    )

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.clear()
        setUser(null)
        blogService.setToken(null)
        notificationChange("successfully logged out",false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const blogObject = {
            title,
            author,
            url
        }
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setTitle('')
                setAuthor('')
                setUrl('')
                notificationChange(`a new blog ${returnedBlog.title} by ${returnedBlog.author} has been added`, false)
            })
            .catch((error) => {
                console.log(error)
                setTitle('')
                setAuthor('')
                setUrl('')
                notificationChange(error.response.data,true)
            })
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
            notificationChange('successfully logged in', false)
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

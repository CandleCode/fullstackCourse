const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: "629b878141dbccc4975b5e2b",
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        user: "629b878141dbccc4975b5e2b",
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        user: "629b878141dbccc4975b5e2b",
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 12,
        user: "629b878141dbccc4975b5e2b",
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        user: "629b878141dbccc4975b5e2b",
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        user: "629b878141dbccc4975b5e2b",
        __v: 0
    }
]

const initialUser = {
_id:"629b878141dbccc4975b5e2b",
   username:"test username",
    name:"test user",
    passwordHash:"$2b$10$XtjQmLEs2PArzdSD0rw61e6Vogj222iKq3n0BJLXpyL1DRnN3ktOe",
    blogs:["5a422bc61b54a676234d17fc","5a422ba71b54a676234d17fb","5a422b891b54a676234d17fa","5a422b3a1b54a676234d17f9", "5a422aa71b54a676234d17f8","5a422a851b54a676234d17f7"],
    __v:0,
}
const initialUserToken= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QgdXNlcm5hbWUiLCJpZCI6IjYyOWI4NzgxNDFkYmNjYzQ5NzViNWUyYiIsImlhdCI6MTY1NDQ0ODg4N30.Wm-YMlM-uvrauG2A_M5gXgWSewlUuoDG6NpLISa7g5c"

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDB, initialUser, initialUserToken
}
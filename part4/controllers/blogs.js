const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
    const user =  request.user
    const body = request.body

    if (!body.url || !body.title) return response.status(400).json('body must contain url or title')
    if (!user) {
        return response.status(401).json({ error: 'token missing'})
    }

    console.log('3')
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const user =  request.user
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(400).json({ error: 'blog was not found' })
    }
    if (!user) {
        return response.status(401).json({ error: 'token missing' })
    }

    if (!(user.id.toString() === blog.user.toString())) {
        return response.status(400).json({ error: 'only the user who created this blog can delete it'})
    }


    user.blogs = user.blogs.filter(blog => !(blog.toString() === request.params.id.toString()))
    await user.save()
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const {body} = request
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog,{ new: true })
    response.json(savedBlog)
})
module.exports = blogsRouter
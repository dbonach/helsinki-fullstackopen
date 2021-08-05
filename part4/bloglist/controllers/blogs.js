const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor
require('express-async-errors')


blogRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})


blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  response.json(blog)
})


blogRouter.post('/', userExtractor, async (request, response) => {

  const body = request.body

  if (!request.token || !request.user) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


blogRouter.delete('/:id', userExtractor, async (request, response) => {

  if (!request.token || !request.user) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }

  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user.id) {
    return response.status(403).json({
      error: 'You don\'t have permission to delete this data'
    })
  }

  await Blog.findByIdAndRemove(request.params.id)

  user.blogs = user.blogs.filter(ObjectId => ObjectId.toString() !== blog.id)

  await user.save()

  response.status(204).end()
})


blogRouter.put('/:id', async (request, response) => {

  const body = request.body

  if (body.likes === undefined) {
    response.status(400).end()
  }

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedBlog)
})


module.exports = blogRouter

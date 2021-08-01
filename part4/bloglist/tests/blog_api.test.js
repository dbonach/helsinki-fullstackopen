const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
require('express-async-errors')

describe('test endpoints', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogsSaved = helper.listWithTwoBlogs
      .map(blog => new Blog(blog))

    const promiseArray = blogsSaved.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('step1, return correct amount of blog posts in json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.listWithTwoBlogs.length)
  })

  test('step2, unique identifier property of a blog post is named id', async () => {
    const response = await api
      .get('/api/blogs')

    const firstPost = response.body[1]

    expect(firstPost.id).toBeDefined()
  })

  test('step3, post request creates a new blog', async () => {

    const createdBlog = await api.post('/api/blogs')
      .send(helper.uniqueBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const savedBlogs = await api
      .get('/api/blogs')

    expect(savedBlogs.body).toHaveLength(helper.listWithTwoBlogs.length + 1)

    const lastSavedBlog = savedBlogs.body[helper.listWithTwoBlogs.length]
    expect(lastSavedBlog).toEqual(createdBlog.body)
  })

  test('step4, if likes property is missing, it will be 0', async () => {
    const blog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    }

    const savedBlog = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)

    expect(savedBlog.body.likes).toBe(0)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

})

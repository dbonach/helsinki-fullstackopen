const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

describe('test endpoints', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogsSaved = helper.initialBlogs
      .map(blog => new Blog(blog))

    const promiseArray = blogsSaved.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('return correct amount of blog posts in json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

})
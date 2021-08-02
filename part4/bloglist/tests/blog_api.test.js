const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
require('express-async-errors')

describe('test endpoints, initially some notes saved', () => {

  // Changed from beforeEach to beforeAll, in the actual state there's
  // no problem, but if more tests are added it should be revised.
  beforeAll(async () => {
    await Blog.deleteMany({})

    const blogsSaved = helper.listWithTwoBlogs
      .map(blog => new Blog(blog))

    const promiseArray = blogsSaved.map(blog => blog.save())
    await Promise.all(promiseArray)

    // Or we could use this way to save the blogs
    // await Blog.insertMany(helper.listWithTwoBlogs)
  })

  test('step1, return correct amount of blog posts in json', async () => {

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.listWithTwoBlogs.length)
  })

  test('step2, unique identifier property is named id', async () => {

    const response = await api
      .get('/api/blogs')
      .expect(200)

    expect(response.body.length).toBeGreaterThan(0)

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

    // Or we could fetch the last by its id
    // const lastSavedBlog = await Blog.findById(createdBlog.body.id)
    // expect(lastSavedBlog.toJSON()).toEqual(createdBlog.body)  
  })

  test('step4, if likes property is missing, default will be 0', async () => {

    const savedBlog = await api
      .post('/api/blogs')
      .send(helper.missingIdBlog)
      .expect(201)

    expect(savedBlog.body.likes).toBe(0)
  })

  test('step5, if title and url are missing, 400 code is generated', async () => {

    await api
      .post('/api/blogs')
      .send(helper.missingUrlAndTitleBlog)
      .expect(400)
  })

})


describe('expansion tests', () => {

  beforeAll(async () => {
    await User.deleteMany({})
  })

  test('expansion stp1, delete request deletes a blog post', async () => {

    const blog = new Blog(helper.uniqueBlogPost)
    await blog.save()

    await api
      .delete(`/api/blogs/${blog._id}`)
      .expect(204)

    const response = await Blog.findById(blog._id)
    expect(response).toBe(null)
  })

  test('expansion stp2, updates a blog likes property', async () => {

    const blog = new Blog(helper.uniqueBlogPost)
    await blog.save()

    const infoToUpdate = {
      likes: blog.likes + 5
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blog._id}`)
      .send(infoToUpdate)
      .expect(200)

    expect(updatedBlog.body.likes).toBe(blog.likes + 5)
  })

  test('expansion stp3, create new users', async () => {

    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

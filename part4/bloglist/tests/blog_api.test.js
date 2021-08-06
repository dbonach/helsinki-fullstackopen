const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
require('express-async-errors')


let token = undefined

beforeAll(async () => {
  await User.deleteMany({})
  const uniqueUser = await helper.createUser(helper.userToLogin)
  token = helper.createToken(uniqueUser)

  await Blog.deleteMany({})

  const savedBlogs = helper.listWithTwoBlogs
    .map(blog => new Blog({ ...blog, user: uniqueUser._id }))

  uniqueUser.blogs = savedBlogs.map(blog => blog._id)
  uniqueUser.save()

  const promiseArray = savedBlogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})


describe('test blogs controller', () => {

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

    const blogsAtStart = await helper.blogsInDb()

    const createdBlog = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.uniqueBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const savedBlogs = await api
      .get('/api/blogs')

    expect(savedBlogs.body).toHaveLength(blogsAtStart.length + 1)

    const lastSavedBlog = await Blog
      .findById(createdBlog.body.id)

    const modifiedLastSavedBlog = {
      title: lastSavedBlog.title,
      author: lastSavedBlog.author,
      url: lastSavedBlog.url,
      likes: lastSavedBlog.likes
    }

    expect(modifiedLastSavedBlog).toEqual(helper.uniqueBlogPost)
  })

  test('step4, if likes property is missing, default will be 0', async () => {

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.missingIdBlog)
      .expect(201)

    expect(response.body.likes).toBe(0)

    const fetchedBlog = await Blog.findById(response.body.id)
    expect(fetchedBlog).not.toBe(null)

    expect(fetchedBlog.likes).toBe(0)
  })

  test(`step5, if title and url are missing, response is 400
  with proper msg, no new blogs are added`, async () => {

    const blogsAtStart = await helper.blogsInDb()

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.missingUrlAndTitleBlog)
      .expect(400)

    expect(response.body.error).toBeDefined()
    expect(response.body.error).toContain('`title` is required')
    expect(response.body.error).toContain('`url` is required')

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('expansion stp2, updates a blog likes property', async () => {

    const blog = new Blog(helper.uniqueBlogPost)
    await blog.save()

    const infoToUpdate = {
      likes: blog.likes + 5
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blog._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(infoToUpdate)
      .expect(200)

    expect(updatedBlog.body.likes).toBe(blog.likes + 5)
  })

  test('expansion stp5-1, fetching all blogs, one must contain information of its creator', async () => {

    const response = await api
      .get('/api/blogs/')
      .expect(200)

    expect(response.body.length).not.toBe(0)

    const firstPost = response.body[1]
    expect(firstPost.user).toBeDefined()

    const user = await User.findById(firstPost.user.id)

    const modifiedUser = { username: user.username, name: user.name, id: user._id.toString() }

    expect(firstPost.user).toEqual(modifiedUser)
  })

  test('expansion stp5-2, fetching a unique blog it must contain information of its creator', async () => {

    const randomBlog = await Blog.findOne({})

    const response = await api
      .get(`/api/blogs/${randomBlog._id.toString()}`)
      .expect(200)

    expect(response.body.user).toBeDefined()

    const user = await User.findById(response.body.user.id)

    const modifiedUser = { username: user.username, name: user.name, id: user._id.toString() }

    expect(response.body.user).toEqual(modifiedUser)
  })

  test('expansion stp7-1, post request without token generates error', async () => {

    const user = await User.findOne({})
    expect(user).toBeDefined()

    const response = await api
      .post('/api/blogs')
      .send(helper.uniqueBlogPost)
      .expect(401)

    expect(response.body).toEqual({ error: 'missing or invalid token' })
  })

  test('expansion stp7-2, user identified by the token is the creator of a blog', async () => {

    const user = await helper.extractUser(token)

    expect(user).toBeDefined()

    const newBlog = new Blog({
      ...helper.uniqueBlogPost,
      user: user._id
    })

    await newBlog.save()

    const response = await api
      .get(`/api/blogs/${newBlog._id.toString()}`)
      .expect(200)

    const addedBlog = response.body

    expect(addedBlog.user).toBeDefined()
    expect(addedBlog.user.id).toBe(user._id.toString())
  })

  test('expansion stp9-1, delete request without token generates error', async () => {

    const user = await helper.extractUser(token)
    expect(user).not.toBe(null)

    const blog = new Blog({
      ...helper.uniqueBlogPost,
      user: user._id
    })

    await blog.save()

    const response = await api
      .delete(`/api/blogs/${blog._id}`)
      .expect(401)

    expect(response.body).toEqual({ error: 'missing or invalid token' })
  })

  test('expansion stp9-2, delete request with proper token is successful', async () => {

    const user = await helper.extractUser(token)
    expect(user).not.toBe(null)

    const blog = new Blog({
      ...helper.uniqueBlogPost,
      user: user._id
    })

    await blog.save()

    await api
      .delete(`/api/blogs/${blog._id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const deletedBlog = await Blog.findById(blog._id.toString())
    expect(deletedBlog).toBe(null)
  })

  test('expansion stp9-3, delete request with different token fails', async () => {

    const user = await helper.extractUser(token)

    const blog = new Blog({
      ...helper.uniqueBlogPost,
      user: user._id
    })

    await blog.save()

    const anotherUser = await helper.createUser({ username: 'password', password: 'password' })
    const anotherUserToken = helper.createToken(anotherUser)

    const response = await api
      .delete(`/api/blogs/${blog._id.toString()}`)
      .set('Authorization', `Bearer ${anotherUserToken}`)
      .expect(403)

    expect(response.body).toEqual({ error: 'You don\'t have permission to delete this data' })
  })

  test('expansion stp10, removed blog should not be listed in user\'s blogs property', async () => {

    const user = await helper.extractUser(token)

    const blog = new Blog({
      ...helper.uniqueBlogPost,
      user: user._id
    })

    await blog.save()

    user.blogs = user.blogs.concat(blog)
    await user.save()

    await api
      .delete(`/api/blogs/${blog._id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const updatedUser = await helper.extractUser(token)
    const userBlogs = updatedUser.blogs.map(ObjectId => ObjectId.toString())
    expect(userBlogs).not.toContain(blog.id)
  })

})


describe('test users controller', () => {

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

  test('expansion stp4-1, creation of user missing username fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Random',
      password: 'wefjiok'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)

    expect(response.body.error).toBe('missing username or password')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('expansion stp4-2, creation of user missing password fails', async () => {

    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'random',
      name: 'Random',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)

    expect(response.body.error).toBe('missing username or password')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('expansion stp4-3, creation of user password with less than 3 characters', async () => {

    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'random',
      name: 'Random',
      password: 'fe'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)

    expect(response.body.error).toBe('password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('expansion stp4-4, creation of already existing username must result in error', async () => {

    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: helper.userToLogin.username,
      name: 'DifferentUser',
      password: 'secret'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('expansion stp5-3, fetched user shows all created blogs by him', async () => {

    const user = await User.findOne({ username: 'uniqueUser' })
    expect(user).toBeDefined()

    const response = await api
      .get(`/api/users/${user._id.toString()}`)
      .expect(200)

    const fetchedUser = response.body
    expect(fetchedUser.blogs).toBeDefined()

    // Two more blogs are added before this test
    // expect(fetchedUser.blogs).toHaveLength(helper.listWithTwoBlogs.length)

    const blogTitles = fetchedUser.blogs.map(blog => blog.title)
    expect(blogTitles).toContain(helper.listWithTwoBlogs[0].title)
    expect(blogTitles).toContain(helper.listWithTwoBlogs[1].title)
  })

  test('expansion stp5-4, blog listed within userInfo is the same as saved one', async () => {

    const user = await User.findOne({ username: 'uniqueUser' })
    expect(user).toBeDefined()

    const blog = new Blog({
      ...helper.uniqueBlogPost,
      user: user._id
    })

    await blog.save()

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    const modifiedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog._id.toString()
    }

    const response = await api
      .get(`/api/users/${user._id.toString()}`)

    const userInfo = response.body

    const filteredBlogFromUser = userInfo.blogs.find(b => b.id === modifiedBlog.id)

    expect(filteredBlogFromUser).toEqual(modifiedBlog)
  })
})


describe('test login controller', () => {

  test('expansion stp6, on login return a token that match to the user', async () => {

    const response = await api
      .post('/api/login')
      .send(helper.userToLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const loginInfo = response.body
    expect(loginInfo.token).toBeDefined()
    const decodedToken = jwt.verify(loginInfo.token, process.env.SECRET)

    expect(decodedToken.username).toBe(helper.userToLogin.username)
  })
})


afterAll(() => {
  mongoose.connection.close()
})

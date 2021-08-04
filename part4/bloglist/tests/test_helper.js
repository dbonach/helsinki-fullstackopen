const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const listWithTwoBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const uniqueBlogPost = {
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2
}

const missingIdBlog = {
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
}

const missingUrlAndTitleBlog = {
  author: 'Robert C. Martin',
  likes: 10,
}

const userToLogin = {
  username: 'uniqueUser',
  password: 'salainen'
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const createUniqueUser = async () => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash('salainen', saltRounds)

  const newUser = new User({
    ...userToLogin,
    passwordHash
  })

  const user = await newUser.save()
  return user
}

const createToken = (user) => {

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  )

  return token
}

module.exports = {
  listWithTwoBlogs,
  uniqueBlogPost,
  missingIdBlog,
  missingUrlAndTitleBlog,
  usersInDb,
  createUniqueUser,
  blogsInDb,
  userToLogin,
  createToken
}
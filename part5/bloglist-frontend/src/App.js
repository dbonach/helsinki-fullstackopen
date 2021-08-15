import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import User from './components/User'
import NewBlogPost from './components/NewBlogPost'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])


  const loggedOutView = () => {
    return (
      <Login
        loginData={loginData}
        setLoginData={setLoginData}
        setUser={setUser}
      />
    )
  }

  const loggedInView = () => {
    return (
      <div>
        <User name={user.username} setUser={setUser} />
        <Blogs blogs={blogs} />
        <NewBlogPost setBlogs={setBlogs} blogs={blogs} />
      </div>
    )
  }


  return (
    <div className='wrapper'>
      {user ? loggedInView() : loggedOutView()}
    </div>
  )
}

export default App
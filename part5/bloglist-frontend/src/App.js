import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'

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
      setUser(user)
    }
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login(loginData)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setUser(user)
      setLoginData({ username: '', password: '' })
    } catch (exception) {
      console.error('Error: ', exception)
    }
  }

  const loggedOutView = () => {
    return (
      <Login
        loginData={loginData}
        setLoginData={setLoginData}
        handleLogin={handleLogin}
      />
    )
  }

  const loggedInView = () => {
    return (
      <div>
        <User name={user.username} setUser={setUser} />
        <Blogs blogs={blogs} />
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
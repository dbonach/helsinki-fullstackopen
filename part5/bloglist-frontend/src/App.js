import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import User from './components/User'
import Toggleable from './components/Toggeable'
import ErrorMessage from './components/ErrorMessage'
import NewBlogPost from './components/NewBlogPost'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState({ msg: null, error: null })
  const blogFormRef = useRef()

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
        setErrorMessage={setErrorMessage}
      />
    )
  }

  const loggedInView = () => {
    return (
      <div>
        <User name={user.username} setUser={setUser} />
        <Blogs blogs={blogs} setBlogs={setBlogs} />
        <Toggleable buttonLabel='New blog post' ref={blogFormRef}>
          <NewBlogPost
            setErrorMessage={setErrorMessage}
            setBlogs={setBlogs}
            blogs={blogs}
            blogFormRef={blogFormRef}
          />
        </Toggleable>
      </div>
    )
  }

  const errorMessageView = () => {
    return errorMessage.msg ?
      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage} /> :
      null
  }


  return (
    <>
      {errorMessageView()}

      <div className='wrapper'>
        {user ? loggedInView() : loggedOutView()}
      </div>
    </>
  )
}

export default App
import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const formStyle = {
  margin: 'auto',
  width: 'fit-content',
  padding: '1rem 1.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1px solid #ccc',
  borderRadius: '.5rem'
}

const formFieldStyle = {
  marginBottom: '.25rem',
}

const labelStyle = {
  display: 'inline-block',
  minWidth: '5rem',
}

const buttonStyle = {
  marginTop: '1rem',
  margin: '1rem auto 0 auto',
}

const centerEverything = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '60vh'
}


const Login = ({ loginData, setLoginData, setUser, setErrorMessage }) => {

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login(loginData)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setLoginData({ username: '', password: '' })

    } catch (exception) {

      setErrorMessage({ msg: 'Wrong username or password', error: true })
      setTimeout(() => {
        setErrorMessage({ msg: null, error: null })
      }, 3000)

      console.error('Error: ', exception)
    }
  }

  return (
    <div style={centerEverything}>

      <form style={formStyle} onSubmit={handleLogin}>

        <h3 style={{ margin: '0 auto 1.5rem auto' }}>Login</h3>

        <div style={formFieldStyle}>
          <label style={labelStyle} htmlFor="username">Username: </label>
          <input
            className="disable-outline"
            type="text"
            id="username"
            name="Username"
            value={loginData.username}
            onChange={({ target }) => setLoginData({ ...loginData, username: target.value })}
          />
        </div>

        <div style={formFieldStyle}>
          <label style={labelStyle} htmlFor="password">Password: </label>
          <input
            className="disable-outline"
            type="password"
            id="password"
            name="Password"
            value={loginData.password}
            onChange={({ target }) => setLoginData({ ...loginData, password: target.value })}
          />
        </div>

        <button type="submit" style={buttonStyle}>Login</button>

      </form>

    </div>
  )
}

Login.propTypes = {
  loginData: PropTypes.object.isRequired,
  setLoginData: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
}

export default Login
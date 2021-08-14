import React from 'react'

const Login = ({ loginData, setLoginData, handleLogin }) => {

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

        <button style={buttonStyle}>Login</button>

      </form>

    </div>
  )
}

export default Login
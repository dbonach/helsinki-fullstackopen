import React from 'react'

const User = ({ name, setUser }) => {

  const logout = () => {
    localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const logoutStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '.875rem',
    color: '#666',
    borderBottom: '2px solid #ddd'
  }

  return (
    <div style={logoutStyle}>
      <p>logged-in as {name}</p>
      <button onClick={logout} style={{ alignSelf: 'center' }} > Logout</button>
    </div>
  )
}

export default User
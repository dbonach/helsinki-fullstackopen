import React, { useState } from 'react'


const previewInfoStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '.25rem'
}

const fullInfoStyle = {
  flexDirection: 'column',
  marginBottom: '1rem',
  border: '1px solid #ddd',
  borderRadius: '.25rem',
  padding: '.5rem',
  overflowWrap: 'anywhere',
  display: 'flex'
}

const likeButtonStyle = {
  marginLeft: '1rem',
  lineHeight: '.75rem'
}

const removeButtonStyle = {
  alignSelf: 'flex-start',
  marginTop: '1rem',
  lineHeight: '.75rem'
}


const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const modifiedPreviewInfoStyle = {
    ...previewInfoStyle,
    color: visible ? '#555' : '#000',
    paddingLeft: visible ? '.5rem' : '0rem'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const renderButton = () => {
    return (
      <button
        style={removeButtonStyle}
        onClick={() => removeBlog(blog)}>remove</button>
    )
  }

  const fullView = () => {
    return (
      <div style={fullInfoStyle}>
        <span>{blog.url}</span>
        <span>
          {blog.likes}
          <button
            onClick={() => updateLikes(blog)}
            style={likeButtonStyle} >like</button>
        </span>
        <span>{blog.user.name}</span>
        {blog.user.username === user.username ? renderButton() : null}
      </div>
    )
  }

  return (
    <>
      <div style={modifiedPreviewInfoStyle}>
        <span>{blog.title} {blog.author}</span>
        <button onClick={toggleVisibility} >view</button>
      </div>

      {visible ? fullView() : null}
    </>
  )
}
export default Blog
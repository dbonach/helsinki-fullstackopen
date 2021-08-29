import React, { useState } from 'react'


const formFieldStyle = {
  marginBottom: '.25rem',
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2rem'
}

const labelStyle = {
  display: 'inline-block',
  width: '3.5rem',
}

const buttonStyle = {
  alignSelf: 'flex-start',
  marginTop: '1.5rem'
}


const BlogForm = ({ createBlog }) => {
  const [blogPost, setBlogPost] = useState({ title: '', author: '', url: '' })

  const handleNewBlogPost = async (e) => {
    e.preventDefault()
    await createBlog(blogPost)
    setBlogPost({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={handleNewBlogPost} style={formStyle}>

      <h3>New blog post</h3>

      <div style={formFieldStyle}>
        <label style={labelStyle} htmlFor="title">Title: </label>
        <input
          className="disable-outline"
          type="text"
          id="title"
          name="Title"
          value={blogPost.title}
          onChange={({ target }) => setBlogPost({ ...blogPost, title: target.value })} />
      </div>

      <div style={formFieldStyle}>
        <label style={labelStyle} htmlFor="author">Author: </label>
        <input
          className="disable-outline"
          type="text"
          id="author"
          name="Author"
          value={blogPost.author}
          onChange={({ target }) => setBlogPost({ ...blogPost, author: target.value })} />
      </div>

      <div style={formFieldStyle}>
        <label style={labelStyle} htmlFor="url">Url: </label>
        <input
          className="disable-outline"
          type="text"
          id="url"
          name="Url"
          value={blogPost.url}
          onChange={({ target }) => setBlogPost({ ...blogPost, url: target.value })} />
      </div>

      <button type="submit" style={buttonStyle} >Create</button>

    </form>
  )
}

export default BlogForm
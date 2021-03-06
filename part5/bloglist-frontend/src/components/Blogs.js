import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ blogs, setBlogs, setErrorMessage, user }) => {

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)

  const updateLikes = async (blog) => {

    const response = await blogService.update(blog)

    const updatedBlogArray = blogs.map(item => {
      if (item.id === blog.id) {
        return { ...item, likes: response.likes }
      }

      return item
    })

    setBlogs(updatedBlogArray)
  }

  const removeBlog = async (blog) => {

    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      try {
        await blogService.remove(blog.id)
        const keepBlogs = blogs.filter(item => item.id !== blog.id)
        setBlogs(keepBlogs)

      } catch (exception) {

        const msg = exception.response.data.error || 'Failed to remove the blog post'
        setErrorMessage({
          msg: msg,
          error: true
        })

        setTimeout(() => {
          setErrorMessage({ msg: null, error: null })
        }, 3000)

        console.error('Error: ', exception)
      }
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          removeBlog={removeBlog}
          user={user} />
      )}
    </div>
  )
}

export default Blogs
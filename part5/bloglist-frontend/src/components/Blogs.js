import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ blogs, setBlogs }) => {

  const updateLikes = async (blog) => {
    const updatedLike = {
      likes: blog.likes + 1,
    }

    const response = await blogService.update(blog.id, updatedLike)

    const updatedBlogArray = blogs.map(item => {
      if (item.id === blog.id) {
        return { ...item, likes: response.likes }
      }

      return item
    })

    setBlogs(updatedBlogArray)
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} />
      )}
    </div>
  )
}

export default Blogs
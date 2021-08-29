import React from 'react'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'


const NewBlogPost = ({ setErrorMessage, setBlogs, blogs, blogFormRef, user }) => {

  const createBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)

      setBlogs(blogs.concat([{ ...response, user: user }]))

      setErrorMessage({
        msg: `Blog post '${response.title}' successfully created`,
        error: false
      })

      setTimeout(() => {
        setErrorMessage({ msg: null, error: null })
      }, 3000)

      blogFormRef.current.toggleVisibility()

    } catch (exception) {

      const msg = exception.response.data.error || 'Failed to create a new blog post'
      setErrorMessage({ msg: msg, error: true })
      setTimeout(() => {
        setErrorMessage({ msg: null, error: null })
      }, 3000)

      console.error('Error: ', exception)
    }

  }


  return (
    <BlogForm
      createBlog={createBlog}
    />
  )
}

export default NewBlogPost
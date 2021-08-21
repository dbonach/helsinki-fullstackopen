import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlogPost => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, newBlogPost, config)
  return request.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const uniqueBlog = `${baseUrl}/${blog.id}`

  const updatedLike = { likes: blog.likes + 1 }

  const request = await axios.put(uniqueBlog, updatedLike, config)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const uniqueUrl = `${baseUrl}/${id}`

  try {
    await axios.delete(uniqueUrl, config)
  } catch (error) {
    return error.response.data
  }
}

const functions = { getAll, create, update, remove, setToken }

export default functions
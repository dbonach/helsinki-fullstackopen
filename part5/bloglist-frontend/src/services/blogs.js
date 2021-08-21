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

const update = async (id, updatedLike) => {
  const config = {
    headers: { Authorization: token },
  }

  const uniqueBlog = `${baseUrl}/${id}`

  const request = await axios.put(uniqueBlog, updatedLike, config)
  return request.data
}

const functions = { getAll, create, update, setToken }

export default functions
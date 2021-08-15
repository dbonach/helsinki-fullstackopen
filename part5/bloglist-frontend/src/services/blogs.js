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
  console.log(request.data);
  return request.data
}

const functions = { getAll, create, setToken }

export default functions
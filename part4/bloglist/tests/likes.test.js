const totalLikes = require('../utils/list_helper').totalLikes
const dummyData = require('./dummy_data')

describe('total likes', () => {

  test('total likes in an empty list of blog posts', () => {
    const result = totalLikes([])
    expect(result).toBe(0)
  })

  test('total likes in a list with one blog post', () => {
    const result = totalLikes(dummyData.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('total likes in a list with five blog posts', () => {
    const result = totalLikes(dummyData.listWithFiveBlogs)
    expect(result).toBe(36)
  })
})
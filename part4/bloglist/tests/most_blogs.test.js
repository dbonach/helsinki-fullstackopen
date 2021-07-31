const mostBlogs = require('../utils/list_helper').mostBlogs
const listWithFiveBlogs = require('./dummy_data').listWithFiveBlogs

describe('find author with the most number of blog posts', () => {

  test('find author with most blogs', () => {
    const result = mostBlogs(listWithFiveBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

})
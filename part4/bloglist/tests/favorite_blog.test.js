const favoriteBlog = require('../utils/list_helper').favoriteBlog
const listWithFiveBlogs = require('./dummy_data').listWithFiveBlogs

describe('find the most voted blog', () => {

  test('find the most voted between five blog posts', () => {
    const result = favoriteBlog(listWithFiveBlogs)
    expect(result).toEqual(
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      }
    )
  })

})
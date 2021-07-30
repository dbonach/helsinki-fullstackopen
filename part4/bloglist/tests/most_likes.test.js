const mostLikes = require('../utils/list_helper').mostLikes
const listWithFiveBlogs = require('../utils/dummy_data').listWithFiveBlogs

describe('find author with the most number of likes', () => {

  test('find most liked author', () => {
    const result = mostLikes(listWithFiveBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })

})
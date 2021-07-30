const dummy = (blog) => {
  console.log(blog)
  return 1
}

const totalLikes = (blogs) => {

  const likesTotal = blogs.reduce(
    (total, currentBlog) => total + currentBlog.likes, 0)

  return likesTotal
}

const favoriteBlog = (blogs) => {
  const blog = blogs.reduce(
    (firstBlog, currentBlog) =>
      currentBlog.likes > firstBlog.likes ? currentBlog : firstBlog
  )

  return blog
}

const mostBlogs = (blogs) => {
  // reduce the array of objects to an array with only author names
  let authors = blogs.map(blog => blog.author)

  // reduce author's array to an object with
  // their names and number of blogs
  const occurrences = authors.reduce((obj, author) => {
    obj[author] = (obj[author] || 0) + 1
    return obj
  }, {})

  // isolate the author with the greatest number of blogs
  let max = 0
  let mostAuthor = ''
  for (let author in occurrences) {
    if (occurrences[author] > max) {
      max = occurrences[author]
      mostAuthor = author
    }
  }

  return { author: mostAuthor, blogs: max }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
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

  // reduce blogs array of objects to an object with
  // author names and the total number of blogs
  const occurrences = blogs.reduce((obj, blog) => {
    obj[blog.author] = (obj[blog.author] || 0) + 1
    return obj
  }, {})

  // isolate the author with the greatest number of blogs
  let maxBlogs = -1
  let mostAuthor = ''
  for (let author in occurrences) {
    if (occurrences[author] > maxBlogs) {
      maxBlogs = occurrences[author]
      mostAuthor = author
    }
  }

  return { author: mostAuthor, blogs: maxBlogs }
}

const mostLikes = (blogs) => {

  // reduce blogs array of objects to an object with
  // author names and the total number of likes
  const occurrences = blogs.reduce((obj, blog) => {
    obj[blog.author] = (obj[blog.author] || 0) + blog.likes
    return obj
  }, {})

  // isolate the author with the greatest number of likes
  let maxLikes = -1
  let mostAuthor = ''
  for (let author in occurrences) {
    if (occurrences[author] > maxLikes) {
      maxLikes = occurrences[author]
      mostAuthor = author
    }
  }

  return { author: mostAuthor, likes: maxLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
const dummy = (blog) => {
  console.log(blog)
  return 1
}

const totalLikes = (blogs) => {
  let likesArray = blogs.map(b => b.likes)

  let likesTotal = likesArray.reduce(
    (total, currentLike) => total + currentLike, 0
  )

  return likesTotal
}

module.exports = {
  dummy,
  totalLikes
}
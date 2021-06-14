const blog = require("../models/blog")
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
const mostBlogs = (blogs) => {
 const res =  _.map(blogs, 'author')
 return result = _.head(_(res)
  .countBy()
  .entries()
  .maxBy(_.last));
}  

const totalLikes2 = (blogs) => {
    return blogs.length === 0
    ? 0
    : blogs.likes
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, item) =>  item.likes + total,0)
}

const favoriteBlog = (blogs) => {
  return  blogs.reduce(
    (max, blog) => (blog.likes > max.likes ? blog : max), blogs[0])
}


  module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog,
    mostBlogs,
  }
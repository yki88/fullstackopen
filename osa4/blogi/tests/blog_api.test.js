const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZXR0YSIsImlkIjoiNjA5M2NhZWFlM2U2N2U1NGFjY2Q4NTQ0IiwiaWF0IjoxNjIwMjk4OTQ5fQ.ib6GDgjqC3pTteM63RGsquFfHCxFeRmcRO8Uwho4714'

beforeEach(async () => {  
    await Blog.deleteMany({}) 
    await Blog.insertMany(helper.initialBlogs)
})


describe('blogs api', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
   expect(true)
  })
  
  test('there are 6 blogs', async () => {
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    
    
  test('the first note is about Go To Statement', async () => {
     const response = await api.get('/api/blogs')
     const titles = response.body.map(r => r.title)
      expect(titles).toContain('Go To Statement Considered Harmful')
   })
  
   test('a blog can be added', async () => {
     const newBlog = {
       title: 'otsikko',
       author: 'Meikämarsu',
       url: 'localhost',
       likes: 0,
       userId: '60a643ea49c3d93bfcfcf42a',
     }

     const response = await api.post('/api/blogs/')
     .send(newBlog)
     .set('Authorization', token)
     .expect(200)
      console.log(response)
     const likes = response.body.map(r => r.likes)
     expect(likes).toBe(0)

   })

   test('likes is set to zero if not specified', async () => {
    const newBlogZeroLikes = {
      title: 'otsikko',
      author: 'Meikämarsu',
      url: 'localhost',
      userId: '60a643ea49c3d93bfcfcf42a',
    }

    await api.post('/api/blogs/')
    .send(newBlogZeroLikes)
    .set('Authorization', token)
    .expect(200)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('otsikko')

  })



   test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const titles = blogsAtEnd.map(r => r.title)
  
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('blog id is called id not _id', async () => {

    const blog = helper.blogsInDb
    console.log(blog)
  }

  )
  

} )



afterAll(() => {
  mongoose.connection.close()
})

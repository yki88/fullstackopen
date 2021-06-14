const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


const bigList = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Joku muu',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
        __v: 0
      }, 
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful 2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Most Liked',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]



describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const emptyList = []

    test('of empty list is zero', () => {
        const res = listHelper.totalLikes(emptyList)
        expect(res).toBe(0)
    })
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const res = listHelper.totalLikes(bigList)
        expect(res).toBe(10)
    })

  })

  describe('favorite blog', () => {
    test('most liked blog is Most Liked', () => {
      const res = listHelper.favoriteBlog(bigList)
      expect(res).toEqual(bigList[2])
    })
  })

  describe('most blogs', () => {
    test('most blogs', () => {
      const res = listHelper.mostBlogs(bigList)
      expect(res).toEqual('Edsger W. Dijkstra')
    })
  })

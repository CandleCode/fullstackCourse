const listHelper = require('../utils/list_helper')

const emptyList = []
const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]


const listWithManyBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('of empty list', () => {
        expect(listHelper.totalLikes(emptyList)).toBe(0)
    })
    test('of list with one blog', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
    })
    test('of list with many blogs', () => {
        expect(listHelper.totalLikes(listWithManyBlogs)).toBe(38)
    })
})

const omitFields = (object) => {
    const { url , _id, __v, ...newObject} = object
    return newObject
}



describe('favourite blog', () => {
    test('of empty list', () => {
        expect(listHelper.favoriteBlog(emptyList)).toEqual({title:'',likes:-1, author:''})
    })
    test('of list with one blog', () => {
        expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(omitFields(listWithOneBlog[0]))
    })
    test('of list with many blogs', () => {
        expect(listHelper.favoriteBlog(listWithManyBlogs)).toEqual(omitFields(listWithManyBlogs[2]))
    })
})
test('return author who has largest amount of blogs', () => {
    expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
})

test('return author who has largest amount of likes across all blogs', () => {
    expect(listHelper.mostLikes(listWithManyBlogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
})
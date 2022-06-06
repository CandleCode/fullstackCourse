const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require("./test_helper");

beforeEach(async () => {
    await User.deleteMany({})
})

describe('create invalid user', () => {
    const userWithShortPassword = {
        name: "userShortPassword",
        password: "23",
        username: "test3243"
    }
    const userWithNoUsername = {
        name: "user with no username",
        password: "2322",
    }
    const userWithShortUsername = {
        name: "user with short username",
        password: "2323",
        username: "te"
    }

    const user = {
        name: "testuser",
        password:"234",
        username: "same username"
    }
    test(' with short password and check that it is not being added', async () => {
        await api
            .post('/api/users')
            .send(userWithShortPassword)
            .expect(400)
        const allUsers = await helper.usersInDB()
        expect(allUsers.length).toBe(0)
    })
    test(' with no username and check that it is not being added', async () => {
        await api
            .post('/api/users')
            .send(userWithNoUsername)
            .expect(400)
        const allUsers = await helper.usersInDB()
        expect(allUsers.length).toBe(0)
    })
    test(' with a short username and check that it is not being added', async () => {
        await api
            .post('/api/users')
            .send(userWithShortUsername)
            .expect(400)
        const allUsers = await helper.usersInDB()
        expect(allUsers.length).toBe(0)
    })
    test(' by trying to create user with same username', async () => {
        await api
            .post('/api/users')
            .send(user)
            .expect(201)
        await api
            .post('/api/users')
            .send(user)
            .expect(400)
        const allUsers = await helper.usersInDB()
        expect(allUsers.length).toBe(1)
    })
})
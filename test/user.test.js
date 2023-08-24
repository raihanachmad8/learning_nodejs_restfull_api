import {app} from "../src/app/web.js";
import supertest from "supertest";
import {createTestUser, removeTestUser} from "./test-util.js";

describe('POST /api/users', () => {
    afterEach(async () => {
        await removeTestUser()
    })


    it('should can reject register invalid', async () => {
        const result = await supertest(app)
            .post('/api/users')
            .send({
                username: "",
                password: "",
                name: ""
            })
        expect(result.status).toBe(400)
        expect(result.body.error).toBeDefined()
    })
    it('should reject register if user already exists', async () => {
        let result = await supertest(app)
            .post('/api/users')
            .send({
                username: "test",
                password: "test1234",
                name: "test"
            })
         result = await supertest(app)
            .post('/api/users')
            .send({
                username: "test",
                password: "test1234",
                name: "test"
            })
        expect(result.status).toBe(400)
        expect(result.body.error).toBeDefined()
    })
})

describe('POST /api/users/login', () => {
    beforeEach(async () => {
        await createTestUser()
    })
    afterEach(async () => {
        await removeTestUser()
    })

    it('should can be login',  async () => {
        const result = await supertest(app)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'test1234'
            })
        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe('test')
    })

    it('should reject if request is invalid',  async () => {
        const result = await supertest(app)
            .post('/api/users/login')
            .send({
                username: '',
                password: ''
            })
        expect(result.status).toBe(400)
        expect(result.body.error).toBeDefined()
    })

    it('should reject if username or password wrong',  async () => {
        const result = await supertest(app)
            .post('/api/users/login')
            .send({
                username: 'testing',
                password: 'testing1234'
            })
        expect(result.status).toBe(401)
        expect(result.body.error).toBeDefined()
    })
})
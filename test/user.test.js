// import supertest from "supertest";
import {app} from "../src/app/web.js";
import {prismaClient} from "../src/app/database.js";
import {logger} from "../src/app/logging.js";
import supertest from "supertest";

describe('POST /api/users', () => {
    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "andy"
            }
        })
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
                username: "andy",
                password: "Andywardana123",
                name: "Andy Wardana"
            })
         result = await supertest(app)
            .post('/api/users')
            .send({
                username: "andy",
                password: "Andywardana123",
                name: "Andy Wardana"
            })
        expect(result.status).toBe(400)
        expect(result.body.error).toBeDefined()
    })
})
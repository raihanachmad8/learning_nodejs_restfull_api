import {createTestUser, removeTestAllContact, removeTestUser} from "./test-util.js";
import supertest from "supertest";
import {app} from "../src/app/web.js";

describe('POST /api/contacts', () => {
    beforeEach(async () => {
        await createTestUser()
    })
    afterEach(async () => {
        await removeTestAllContact()
        await removeTestUser()
    })
    it('should can create new contact', async () => {
        const result = await supertest(app)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                firstname: 'coba',
                lastname: 'coba_last',
                email: 'coba@gmail.com',
                phone: '089342351352'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.firstname).toBe('coba')
        expect(result.body.data.lastname).toBe('coba_last')
        expect(result.body.data.phone).toBe('089342351352')
    })
    it('should reject if request is not valid', async () => {
        const result = await supertest(app)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                firstname: '',
                lastname: 'coba_last',
                email: 'coba@gmail.com',
                phone: '089342351354324234234'
            })

        expect(result.status).toBe(400)
        expect(result.body.error).toBeDefined()
    })
})
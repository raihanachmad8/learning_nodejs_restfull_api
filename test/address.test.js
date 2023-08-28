import {
    createManyTestContact,
    createTestUser, getTestContact,
    removeAllTestAddress,
    removeTestAllContact,
    removeTestUser
} from "./test-util.js";
import supertest from "supertest";
import {app} from "../src/app/web.js";

describe('POST /api/contacts/:contactId/addresses', () => {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestContact();
    })

    afterEach(async () => {
        await removeAllTestAddress()
        await removeTestAllContact();
        await removeTestUser();
    })

    it('should can create new address', async () => {
        const testContact = await getTestContact()

        const result = await supertest(app)
            .post('/api/contacts/'+ testContact.id+ '/addresses')
            .set('Authorization', 'test')
            .send({
                street: 'jalan test',
                city: 'kota test',
                province: 'province test',
                country: 'konoha',
                postal_code: '123425'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe('jalan test')
        expect(result.body.data.city).toBe('kota test')
        expect(result.body.data.province).toBe('province test')
        expect(result.body.data.country).toBe('konoha')
        expect(result.body.data.postal_code).toBe('123425')
        })

    it('should reject if request is not valid', async () => {
        const testContact = await getTestContact()

        const result = await supertest(app)
            .post('/api/contacts/'+ testContact.id+ '/addresses')
            .set('Authorization', 'test')
            .send({
                street: 'jalan test',
                city: 'kota test',
                province: 'province test',
                country: 'konoha',
                postal_code: ''
            })

        expect(result.status).toBe(400)
    })

    it('should reject if contact not found ', async () => {
        const testContact = await getTestContact()

        const result = await supertest(app)
            .post('/api/contacts/'+1+ '/addresses')
            .set('Authorization', 'test')
            .send({
                street: 'jalan test',
                city: 'kota test',
                province: 'province test',
                country: 'konoha',
                postal_code: 'asdf'
            })

        expect(result.status).toBe(404)
    })

})
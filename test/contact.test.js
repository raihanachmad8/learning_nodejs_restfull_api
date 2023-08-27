import {createTestContact, createTestUser, getTestContact, removeTestAllContact, removeTestUser} from "./test-util.js";
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

describe('GET /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeTestAllContact()
        await removeTestUser()
    })

    it('should can get contact', async () => {
        const testContact = await getTestContact()
        const result = await supertest(app)
            .get('/api/contacts/'+ testContact.id)
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.firstname).toBe('test1')
        expect(result.body.data.lastname).toBe('test1')
        expect(result.body.data.email).toBe('test@gmail.com')
        expect(result.body.data.phone).toBe('089513232134')

    })
    it('should return 404 if contact id not found', async () => {
        const testContact = await getTestContact()
        const result = await supertest(app)
            .get('/api/contacts/'+ (testContact.id + 1))
            .set('Authorization', 'test')

        expect(result.status).toBe(404)
        expect(result.body.error).toBeDefined()

    })
})

describe('PUT /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeTestAllContact()
        await removeTestUser()
    })
    it('should update existing contact', async () => {
        const testContact = await getTestContact()
        const result = await supertest(app)
            .put('/api/contacts/'+ testContact.id)
            .set('Authorization', 'test')
            .send({
                firstname: 'raihan',
                lastname: 'raihan',
                email: 'raihan@gmail.com',
                phone: '089324234',
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.firstname).toBe('raihan')
        expect(result.body.data.lastname).toBe('raihan')
        expect(result.body.data.email).toBe('raihan@gmail.com')
        expect(result.body.data.phone).toBe('089324234')
    })
    it('should reject if request is not valid', async () => {
        const testContact = await getTestContact()
        const result = await supertest(app)
            .put('/api/contacts/'+ testContact.id)
            .set('Authorization', 'test')
            .send({
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
            })

        expect(result.status).toBe(400)
        expect(result.body.error).toBeDefined()
    })
    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact()
        const result = await supertest(app)
            .put('/api/contacts/'+ (testContact.id + 1))
            .set('Authorization', 'test')
            .send({
                firstname: 'raihan',
                lastname: 'raihan',
                email: 'raihan@gmail.com',
                phone: '089324234',
            })

        expect(result.status).toBe(404)
        expect(result.body.error).toBeDefined()
    })
})

describe('DELETE /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeTestAllContact();
        await removeTestUser();
    })

    it('should can delete contact', async () => {
        let testContact = await getTestContact();
        const result = await supertest(app)
            .delete('/api/contacts/' + testContact.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testContact = await getTestContact();
        expect(testContact).toBeNull();
    });

    it('should reject if contact is not found', async () => {
        let testContact = await getTestContact();
        const result = await supertest(app)
            .delete('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

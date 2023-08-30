import {
    createManyTestContact, createTestAddress,
    createTestUser, getTestAddress, getTestContact,
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

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestContact();
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllTestAddress()
        await removeTestAllContact();
        await removeTestUser();
    })

    it('should can get contact', async () => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(app)
            .get('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe('jalan test');
        expect(result.body.data.city).toBe('kota test');
        expect(result.body.data.province).toBe('province test');
        expect(result.body.data.country).toBe('konoha');
        expect(result.body.data.postal_code).toBe('123425');
    });

    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(app)
            .get('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });

    it('should reject if address is not found', async () => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(app)
            .get('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
})


describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestContact();
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllTestAddress()
        await removeTestAllContact();
        await removeTestUser();
    })

    it('should can update address data', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(app)
            .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
            .set('Authorization', 'test')
            .send({
                street: 'new street',
                city: 'new city',
                province: 'new province',
                country: 'new country',
                postal_code: 'new 1234',
            })

        expect(result.status).toBe(200)
        expect(result.body.data.street).toBe('new street')
        expect(result.body.data.city).toBe('new city')
        expect(result.body.data.province).toBe('new province')
        expect(result.body.data.country).toBe('new country')
        expect(result.body.data.postal_code).toBe('new 1234')
    })
    it('should must invalid update address data', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(app)
            .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
            .set('Authorization', 'salah')
            .send({
                street: 'new street',
                city: 'new city',
                province: 'new province',
                country: 'new country',
                postal_code: 'new 1234',
            })

        expect(result.status).toBe(401)
    })
    it('should reject if update address data not valid', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(app)
            .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
            .set('Authorization', 'test')
            .send({
                street: 'new street',
                city: 'new city',
                province: 'new province'
            })

        expect(result.status).toBe(400)
    })
    it('should reject if identity not found', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(app)
            .put('/api/contacts/' + (testContact.id + 1) + '/addresses/' + (testAddress.id + 1))
            .set('Authorization', 'test')
            .send({
                street: 'new street',
                city: 'new city',
                province: 'new province',
                country: 'new country',
                postal_code: 'new 1234',
            })

        expect(result.status).toBe(404)
    })
})
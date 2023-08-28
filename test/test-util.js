import {prismaClient} from "../src/app/database.js";
import bcrypt from "bcrypt";

const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: 'test',
            password: await bcrypt.hash('test1234', 10),
            name: 'test',
            token: 'test'
        }
    })
}

const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username : 'test'
        }
    })
}

const removeTestAllContact = async () => {
    return prismaClient.contact.deleteMany({
        where: {
             username: 'test'
        }
    })
}

const createTestContact = async () => {
    return prismaClient.contact.create({
        data: {
            username:'test',
            firstname: 'test1',
            lastname: 'test1',
            email: 'test@gmail.com',
            phone: '089513232134'
        }
    })
}

const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: 'test'
        }
    })
}

const createManyTestContact = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.contact.create({
            data: {
                username: `test`,
                firstname: `test ${i}`,
                lastname: `test ${i}`,
                email: `test${i}@gmail.com`,
                phone: `080900000${i}`
            }
        })
    }
}

const removeAllTestAddress = async () => {
    return prismaClient.address.deleteMany({
        where: {
            contact: {
                username: 'test'
            }
        }
    })
}

export {
    createTestUser,
    removeTestUser,
    getTestUser,
    removeTestAllContact,
    createTestContact,
    getTestContact,
    createManyTestContact,
    removeAllTestAddress
}
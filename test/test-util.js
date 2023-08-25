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
export {
    createTestUser,
    removeTestUser,
    getTestUser,
    removeTestAllContact
}
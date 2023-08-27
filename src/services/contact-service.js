import {validate} from "../validation/validation.js";
import {
    createContactValidation,
    getContactValidation,
    updateContactValidation
} from "../validation/contact-validation.js";
import {prismaClient} from "../app/database.js";
import {ResponseError} from "../error/response-error.js";

const create = async (user, request) => {
    const contact = validate(createContactValidation, request)
    contact.username = user.username
    return prismaClient.contact.create({
        data: contact,
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true
        }
    })
}

const get = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId)
    const contact = await prismaClient.contact.findFirst({
        where: {
            username: user.username,
            id: contactId
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true

        }
    })

    if (!contact) {
        throw new ResponseError(404, 'contact is not found')
    }
    return contact


}

const update = async (user, request) => {
    const contact = validate(updateContactValidation, request)
    const totalContactInDB = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contact.id
        }
    })

    if (totalContactInDB !== 1) {
        throw new ResponseError(404, "contact is not found")
    }

    return prismaClient.contact.update({
        where: {
            id: contact.id
        },
        data: {
            firstname: contact.firstname,
            lastname: contact.lastname,
            email: contact.email,
            phone: contact.phone
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true
        }
    })
}
export default {
    create,
    get,
    update
}
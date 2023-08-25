
import {validate} from "../validation/validation.js";
import {createContactValidation} from "../validation/contact-validation.js";
import {prismaClient} from "../app/database.js";

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

export default {
    create
}
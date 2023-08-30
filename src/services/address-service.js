import {prismaClient} from "../app/database.js";
import {validate} from "../validation/validation.js";
import {getContactValidation} from "../validation/contact-validation.js";
import {ResponseError} from "../error/response-error.js";
import {createAddressValidation, getAddressValidate, updateAddressValidate} from "../validation/address-validation.js";


const checkContactMustExists = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId)
    const totalContactInDB = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId,

        }
    })

    if (totalContactInDB !== 1) {
        throw new ResponseError(404, 'contact is not found')
    }

    return contactId
}
const create = async (user, contactId, request) => {
    contactId = await checkContactMustExists(user, contactId)
    const address = validate(createAddressValidation, request)
    address.contact_id = contactId
    return prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    })
}

const get = async (user, contactId, addressId) => {
    contactId = await checkContactMustExists(user, contactId)
    addressId = validate(getAddressValidate, addressId)
    const address = await prismaClient.address.findFirst({
        where: {
            contact_id : contactId,
            id: addressId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    })

    if (!address) {
        throw new ResponseError(404, 'address is not found')
    }

    return address
}

const update = async (user, contactId, addressId, request) => {

    contactId = await checkContactMustExists(user, contactId)
    const address = validate(updateAddressValidate, request)


    const totalAddressInDB = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: address.id
        }
    })

    if (totalAddressInDB !== 1) {
        throw new ResponseError(404, "address is not found")
    }

    return prismaClient.address.update({
        where: {
            id: address.id
        },
        data: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postal_code: address.postal_code,
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    })
}

export default {
    create,
    get,
    update
}
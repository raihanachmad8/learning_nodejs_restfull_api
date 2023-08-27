import Joi from "joi";

const createContactValidation = Joi.object({
    firstname: Joi.string().max(100).required(),
    lastname: Joi.string().max(100).optional(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional()
})

const getContactValidation = Joi.number().positive().required()

const updateContactValidation = Joi.object({
    id: Joi.number().positive().required(),
    firstname: Joi.string().max(100).required(),
    lastname: Joi.string().max(100).optional(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional()
})

export {
    createContactValidation,
    getContactValidation,
    updateContactValidation
}
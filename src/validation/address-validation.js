import Joi from "joi";

const createAddressValidation = Joi.object({
    street: Joi.string().max(255).optional(),
    city: Joi.string().max(100).optional(),
    province: Joi.string().max(100).optional(),
    country: Joi.string().max(100).required(),
    postal_code: Joi.string().max(10).required(),
})

const getAddressValidate = Joi.number().min(1).positive().required()

const updateAddressValidate = Joi.object({
    id: Joi.number().positive().required(),
    street: Joi.string().max(255).optional(),
    city: Joi.string().max(100).optional(),
    province: Joi.string().max(100).optional(),
    country: Joi.string().max(100).required(),
    postal_code: Joi.string().max(10).required(),
})

export {
    createAddressValidation,
    getAddressValidate,
    updateAddressValidate
}
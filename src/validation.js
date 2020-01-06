const Joi = require('@hapi/joi');

const schema =
    Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

module.exports = schema;
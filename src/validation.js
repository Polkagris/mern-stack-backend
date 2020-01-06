const Joi = require('@hapi/joi');

// Register
const registerValidation = (data) => {
    const schema =
        Joi.object({
            username: Joi.string().min(6).required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required(),
        });

    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
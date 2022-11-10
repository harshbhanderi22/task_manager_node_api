const Joi = require('joi');
 
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(20).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(255)
    })
    const validate = schema.validate(data);
    return validate;
}

const loginvalidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })
    const validate = schema.validate(data);
    return validate;
}

const taskvalidation = (data) => {
    const schema = Joi.object({
        task: Joi.string().required(),
        date: Joi.date().required().default(Date.now()),
        priority: Joi.bool().required(),
        user_id: Joi.string().required()

    })
    const validate = schema.validate(data);
    return validate;
}
module.exports.registerValidation = registerValidation;
module.exports.loginvalidation = loginvalidation;
module.exports.taskvalidation = taskvalidation;
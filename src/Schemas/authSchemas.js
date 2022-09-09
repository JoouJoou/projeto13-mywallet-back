import joi from "joi";

const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email(),
    password: joi.string().required().min(5)
})

const loginSchema = joi.object({
    email: joi.string().email(),
    password:joi.string().required().min(5)
})

export { signupSchema, loginSchema }
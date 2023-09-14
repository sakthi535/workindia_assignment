const yup = require('yup');
const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;

const loginUserSchema = yup
    .object({
        login: yup.string().trim().min(6).max(50).required(),
        password: yup.string().required(),
    })
    .required();

const registerUserSchema = yup
    .object({
        username: yup.string().trim().min(6).max(50).required(),
        email: yup.string().required().email().required(),
        password: yup.string().matches(PASSWORD_REGEX, 'password must contain only letters and numbers with a minimum of 8 characters').required(),
    })
    .required();

exports.loginUserSchema = loginUserSchema;
exports.registerUserSchema = registerUserSchema;
const yup = require('yup');

const parse = require("date-fns/parse");
const moment = require("moment");

const createTrainSchema = yup
    .object({
        train_name: yup.string().trim().min(6).max(50).required(),
        source: yup.string().trim().min(6).max(50).required(),
        destination : yup.string().trim().min(6).max(50).required(),
        seat_capacity: yup.number().min(20).required(),
    })
    .required();

exports.createTrainSchema = createTrainSchema;
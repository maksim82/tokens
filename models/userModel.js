const { Schema, model } = require('mongoose');

const UserModel = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, required: true},
    name: {type: String},
    surName: {type: String},
    patronymic: {type: String}
});

module.exports = model('Users', UserModel);
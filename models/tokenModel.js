const { Schema, model } = require('mongoose');

const TokenModel = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'Users'},
    refreshToken: {type: String, required: true}
});

module.exports = model('Token', TokenModel);
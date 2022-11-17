const jwt = require('jsonwebtoken');
const TokenModel = require('../models/tokenModel');

class TokenServices {
    createToken(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: '20s'});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: '5m'});

        return {
            accessToken,
            refreshToken
        };
    }

    checkRefreshToken(token) {
        const checkToken = jwt.verify(token, process.env.REFRESH_SECRET);
        return checkToken;
    }

    checkAccessToken(token) {
        const checkToken = jwt.verify(token, process.env.ACCESS_SECRET);
        return checkToken;
    }

    async saveToken(id, refreshToken) {
        const tokenBd = await TokenModel.findOne({ user: id });
        if (tokenBd) {
            tokenBd.refreshToken = refreshToken;
            return tokenBd.save();
        }
        const token = await TokenModel.create({user: id, refreshToken});
        return token;
    }

    async removeToken(refreshToken) {
        const token = await TokenModel.deleteOne({ refreshToken });
        return token;
    }

    async findToken(refreshToken) {
        const token = await TokenModel.findOne({ refreshToken });
        return token;
    }
}

module.exports = new TokenServices();
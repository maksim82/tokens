const UserDTO = require('../dtos/UserDTO');
const tokenServices = require('./tokenServices');
const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

class UserServices {
    async register(email, password, login, role) {
        const hashPassword = await bcrypt.hash(password, 5);
        const userBd = await UserModel.create({ email, login, role, password: hashPassword });
        const userDTO = new UserDTO(userBd);
        const token = tokenServices.createToken( {...userDTO} );
        await tokenServices.saveToken(userDTO.id, token.refreshToken);
        return {
            id: userDTO.id,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken
        };
    }

    async login(login, password) {
        const userBd = await UserModel.findOne({ login });
        if (!userBd) {
            throw new Error();
        }

        const hashPassword = await bcrypt.compare(password, userBd.password);
        if (!hashPassword) {
            throw new Error();
        }

        const userDTO = new UserDTO(userBd);
        const token = tokenServices.createToken( {...userDTO} );
        await tokenServices.saveToken(userDTO.id, token.refreshToken);

        return {...token, id: userDTO.id};
    }

    async logout(refreshToken) {
        const token = await tokenServices.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        const checkToken = tokenServices.checkRefreshToken(refreshToken);
        const findToken = await tokenServices.findToken(refreshToken);
        const user = await UserModel.findById(checkToken.id);
        const userDTO = new UserDTO(user);
        const token = tokenServices.createToken({ ...userDTO });
        await tokenServices.saveToken(userDTO.id, token.refreshToken);

        return {...token, id: userDTO.id};
    }

    async getUser(id) {
        const user = await UserModel.findOne({ _id: id });
        return user;
    }

    async updateUser(body) {
        const user = await UserModel.findOne({ _id: body.id });
        for (let prop in body ) {
            user.prop = body[prop];
        }
        user.save();
        return user;
    }
}

module.exports = new UserServices();
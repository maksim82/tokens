const userServices = require('../services/UserServices');

class UserController {
    async login(req, res) {
        try {
            const {login, password} = req.body;
            console.log(login, password)
            const user = await userServices.login(login, password);
            console.log(user)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(user);
        } catch(e) {
            res.send("Ошибка");
        }
    }

    async register(req, res) {
        try {
            const {login, email, role, password} = req.body;
            const user = await userServices.register(email, password, login, role);
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(user);
        } catch(e) {
            res.send("Ошибка");
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userServices.logout(refreshToken);
            res.clearCookie();
            return res.json(token);
        } catch(e) {
            res.send("Ошибка");
        }
    }

    async refresh(req, res) {
        try {
            // console.log(req.cookies)
            const { refreshToken } = req.cookies;
            const token = await userServices.refresh(refreshToken);
            res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(token);
        } catch(e) {
            res.send('Ошибка');
        }
    }

    async getUser(req, res) {
        try {
            // console.log(req.cookies)
            const { id } = req.params;
            const home = await userServices.getUser(id);
            return res.json(home);
        } catch(e) {
            console.log('Ошибка или нету доступа');
        }
    }

    async getUsers(req, res) {
        try {

        } catch(e) {
            console.log('Ошибка или нету доступа');
        }
    } 

    async updateUser(req, res) {
        try {
            const user = await userServices.updateUser({ ...req.body });
            return res.json(user);
        } catch(e) {
            console.log('Ошибка или нету доступа');
        }
    }

    async getStatistic(req, res) {
        try {
            
        } catch(e) {
            console.log('Ошибка или нету доступа');
        }
    }
}

module.exports = new UserController();
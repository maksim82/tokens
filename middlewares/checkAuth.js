const tokenServices = require('../services/TokenServices');

module.exports = (req, res, next) => {
    const authentication = req.headers.authorization;
    if (!authentication) {
        return res.send("Не авторизован");
    }

    const accessToken = authentication.split(' ')[1];

    if (!accessToken) {
        return res.send('Токена нет');
    }

    const userData = tokenServices.checkAccessToken(accessToken);

    if (!userData) {
        return res.send('Токен не валиден');
    }
    
    next();
};
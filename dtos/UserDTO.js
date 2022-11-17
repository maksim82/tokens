module.exports = class UserDTO {
    constructor({ _id, login, role, email }) {
        this.id = _id;
        this.login = login;
        this.role = role;
        this.email = email;
    }
};
import { encryptPassword } from "../util/util.js";

class Admin {
    constructor({ username, password, name }) {
        this.name = name;
        this.username = username;
        this.password = encryptPassword(password);
        this.userType = "admin";
    }

    editAdmin({ username = null, password = null, name = null }) {
        if (username) this.username = username;
        if (password) this.password = encryptPassword(password);
        if (name) this.name = name;
    }

    toJSON() {
        return {
            username: this.username,
            name: this.name,
        }
    }
}

export default Admin;

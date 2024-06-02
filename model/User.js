import { saveUsers } from "../controller/users.js";
import { encryptPassword } from "../util/util.js";
import Cart from "./Cart.js";
import Pays from "./Pays.js";

class User {
    constructor({username, password, name, cart = undefined, payment_history = []}) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.userType = "user";
        this.cart = cart ? new Cart(cart.id, cart.products) : new Cart();
        this.payment_history = payment_history.map(history => new Pays(history.payment_history, history.id));
    }

    editUser({username = null, password = null, name = null}) {
        if(username) this.username = username;
        if(password) this.password = (password);
        if(name) this.name = name;
        saveUsers();
    }

    addToCart(product) {
        this.cart.addProduct(product);
        saveUsers();
    }

    removeFromCart(product) {
        this.cart.removeProduct(product);
        saveUsers();
    }

    addPaymentHistory(history){
        this.payment_history.push(new Pays(history));
        this.cart = new Cart();
        saveUsers();
    }

    getPaymentHistory(){
        return this.payment_history;
    }

    toJSON() {
        return {
            username: this.username,
            name: this.name,
            password: this.password,
            cart: this.cart.toJSON(),
            payment_history: this.payment_history.map(history => history.toJSON())
        }
    }
}

export default User;
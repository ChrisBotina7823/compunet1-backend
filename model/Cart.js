import { getProductById } from "../controller/products.js";
import { generateId } from "../util/util.js";
import Product from "./Product.js";

import { addProduct as addProductGlobal } from "../controller/products.js";

class Cart {
    constructor(id = generateId(), products = {}) {
        this.id = id;
        if (Array.isArray(products)) {
            this.products = {};
            products.forEach(product => {
                const productFromId = getProductById(product.id);
                if (productFromId) {
                    this.products[product.id] = product.quantity;
                } else {
                    this.products[product.id] = addProductGlobal(product);
                }
            });
        } else {
            this.products = products;
        }
    }

    addProduct(product) {
        if(!this.products[product.id]) this.products[product.id] = 0;
        this.products[product.id]++;
    }

    removeProduct(product) {
        this.products[product.id]--;
        if(this.products[product.id] === 0) delete this.products[product.id];
    }

    toJSON() {
        const productList = [];
        for (const productId in this.products) {
            const product = getProductById(productId);
            if(!product) continue;
            const productJSON = product.toJSON();
            productJSON["quantity"] = this.products[productId];
            productList.push(productJSON);
        }
        return {
            id: this.id,
            products: productList
        };
    }
}

export default Cart;
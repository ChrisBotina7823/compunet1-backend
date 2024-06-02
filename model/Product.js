import { generateId } from "../util/util.js";

class Product {
    constructor({id = undefined, title, category, description, price, thumbnail, stock = 0}) {
        this.id = id || generateId();
        this.title = title;
        this.category = category;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
    }
    
    editProduct({title = null, category = null, description = null, price = null, thumbnail = null, stock = null}) {
        if(title) this.title = title;
        if(category) this.category = category;
        if(description) this.description = description;
        if(price) this.price = price;
        if(thumbnail) this.thumbnail = thumbnail;
        
    }

    editProductStock(stock){
        if(stock) this.stock = stock;
    }

    getStock(){
        return this.stock;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            category: this.category,
            description: this.description,
            price: this.price,
            thumbnail: this.thumbnail,
            stock: this.stock,
        }
    }
}

export default Product;
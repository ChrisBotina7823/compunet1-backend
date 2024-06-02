import { addProduct, getAllProducts } from "../controller/products.js";
import { addUser, getAllUsers, getUserByUsername } from "../controller/users.js";
import Product from "../model/Product.js";

export default function generateData() {
    try {
        if(!getAllProducts().length) {
            for(let i = 0; i < 10; i++) {
                let product = new Product({
                    title: `Product ${i}`,
                    price: Math.floor(Math.random() * 100),
                    description: `Description of product ${i}`,
                    thumbnail: `https://picsum.photos/200?random=${i}`,
                    category: `Category ${i}`,
                    stock: Math.floor(Math.random() * 100)
                });
                addProduct(product);
            }
        }
        if(!getAllUsers().length < 1) {
            for(let i=0; i<5; i++) {
                const products = getAllProducts();
                let userData = {
                    username: `u${i}`,
                    name: `User ${i}`,
                    password: `p${i}`
                };
                addUser(userData)
                const user = getUserByUsername(userData.username)
                const productToAdd = products[Math.floor(Math.random() * products.length)]; 
                user.addToCart(productToAdd)
            }
        }

    } catch(err) {
        console.log(err);
    }
}
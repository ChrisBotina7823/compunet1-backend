
import Product from '../model/Product.js'
import { loadData, saveData } from '../util/util.js'

const products = loadData("products", Product)

const saveProducts = () => {
    saveData("products", products)
}

const getAllProducts = () => {
    return products
}

const getProductById = (id) => {
    return products.find(product => product.id === id)
}

const deleteProduct = (id) => { 
    products = products.filter(product => product.id !== id)
    saveProducts();
    return true
}

const addProduct = (productData) => {
    const newProduct = new Product(productData)
    products.push(newProduct)
    saveProducts();
    return newProduct
}

const editProduct = (id, productData) => {
    const product = products.find(product => product.id === id)
    product.editProduct(productData)
    saveProducts();
    return product
}

const editProductStock = (productData) => {
    const product = products.find(product => product.id === productData.id)
    product.editProductStock(productData.stock)
    saveProducts();
    return product
}


const getStock = (id) => {
    const product = products.find(product => product.id == id)
    return product.getStock();
}

export {
    getAllProducts,
    getProductById,
    deleteProduct,
    editProductStock,
    addProduct,
    editProduct,
    getStock
}
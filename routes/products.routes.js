import express from 'express';
import axios from 'axios';
import { addProduct, editProductStock, getAllProducts } from '../controller/products.js';
import { upload } from '../util/multer.js';


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = getAllProducts();
        const productsJSON = products.map(product => product.toJSON());
        res.json({products: productsJSON});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
});

router.post('/', upload.single('thumbnail'), async (req, res) => {
    try {
        const thumbnail = req.file
        req.body.thumbnail = thumbnail ?  `${req.protocol}://${req.get('host')}/${thumbnail.path}` : "";
        const product = addProduct(req.body)
        res.json({message: 'Producto agregado'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar un producto');
    }
})

router.post('/edit', async (req, res) => {
    try {
        editProductStock(req.body)
        res.json({message: 'Stock modificado 233'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al modificar el Stock');
    }
})

export default router;

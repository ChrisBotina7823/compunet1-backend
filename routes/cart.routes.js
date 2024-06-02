import { Router } from 'express';
import { getUserByUsername } from '../controller/users.js';
import { getProductById, getStock, editProductStock } from '../controller/products.js';

const router = Router()

router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const user = getUserByUsername(username);
    res.json({cart: user.cart.toJSON()});
});

router.post('/pay/:username', async (req, res) => {
    const {username} = req.params;
    const user = getUserByUsername(username);

    let data = req.body

    data.forEach(element => {
        if(element.stock - element.quantity > 0){
            element.stock = element.stock - element.quantity;
            
        }
        else if(element.stock - element.quantity == 0){
            element.stock = 0
        }

        editProductStock(element);
    });
   

    

    user.addPaymentHistory(data);
  
    res.json(user.getPaymentHistory());

})

router.post('/getStock/:username', async (req, res) => {
    const {username} = req.params;
    const user = getUserByUsername(username);

    
    res.json(getStock(req.body.id))

})

router.post('/paymentHistory/:username', async (req, res) => {
    const {username} = req.params;
    const user = getUserByUsername(username);  
    res.json(user.getPaymentHistory().map(history => history.toJSON()));
})

router.post('/:username/products/:productId', async (req, res) => {
    const {username, productId} = req.params;
    const user = getUserByUsername(username);
    const product = getProductById(productId)
    user.addToCart(product);
    res.json({cart: user.cart.toJSON()});
})

router.delete('/:username/products/:productId', async (req, res) => {
    const {username, productId} = req.params;
    const user = getUserByUsername(username);
    const product = getProductById(productId)
    user.removeFromCart(product);
    res.json({cart: user.cart.toJSON()});
})


export default router;
import express from 'express';
import { addUser, getAllUsers, getUserByUsername } from '../controller/users.js';
import bcrypt from 'bcrypt';

const router = express.Router();

//Register users
router.post('/register',(req, res) =>{
    const userData = req.body;
    try {
        addUser(userData);
        res.status(201).send({"message": "User created successfully"})
    } catch (err){
        res.status(400).send({"error": err});
    }
});

//clients Login
router.post('/login', (req, res) => {
    const { username, password } = req.body; 
    const user = getUserByUsername(username); 
    const matchPassword = user && user.password == password; 
    if (user && matchPassword) { 
        res.status(200).send({user: user.toJSON()}); 
    } else {
        res.status(401).send("Incorrect credentials."); 
    }
});

//Admin login 
router.post('/admin/login', (req, res) => {
    const { username, password } = req.body; 
    const user = getUserByUsername(username); 
    if (!user || user.userType !== "admin" || user.password !== password) { 
        res.status(401).send("Incorrect credentials."); 
    } else {
        res.status(200).send("Successful login."); 
    }
});

export default router;

import fs from 'fs';
import User from "../model/User.js"
import Admin from "../model/Admin.js";
import { json } from 'express';
import { loadData, saveData } from '../util/util.js';


const users = loadData("users", User);

const saveUsers = () => {
    saveData("users", users);
}

const addUser = (userData) => {
    if(getUserByUsername(userData.username)){
        throw new Error ("The user name is registered yet.");
    }
    const newUser = new User(userData);
    users.push(newUser);
    saveUsers();
}

const getUserByUsername = (username) => {
    return users.find(user => user.username === username)
}

const deleteUser = (username) => {
    users.filter(user => user.username !== username)
    saveUsers();
}

const editUser = (username, userData) => {
    const user = users.find(user => user.username === username)
    user.editUser(userData)
    saveUsers();
}

const getAllUsers = () => {
    return users
}

if (!getUserByUsername("admin")){
    const adminData = {
        username: "admin",
        password: "admin",
        name: "Administrator",
    }
    const admin = new User(adminData);
    users.push(admin)
    saveUsers();
}

export {
    addUser,
    getUserByUsername,
    deleteUser,
    editUser,
    getAllUsers,
    saveUsers
}
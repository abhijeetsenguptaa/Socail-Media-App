require('dotenv').config();
const express = require('express');
const { registeringUser, loggingUser, fetchingRegisteredUser } = require('../controllers/user.controllers');




const userRoute = express.Router();

userRoute.get('/users', fetchingRegisteredUser);

userRoute.post('/register', registeringUser);

userRoute.post('/login', loggingUser);



module.exports = { userRoute };
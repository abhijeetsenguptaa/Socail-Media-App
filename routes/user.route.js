require('dotenv').config();
const express = require('express');
const { registeringUser, loggingUser, fetchingRegisteredUser, fetchingFriendsList, sendFriendRequest, acceptingFriendRequest } = require('../controllers/user.controllers');
const { authentication } = require('../middlewares/authentication.middleware');




const userRoute = express.Router();

userRoute.get('/users', fetchingRegisteredUser);

userRoute.get('/users/:id/friends', fetchingFriendsList);

userRoute.post('/register', registeringUser);

userRoute.post('/login', loggingUser);

userRoute.post('/users/:id/friends', authentication, sendFriendRequest);

userRoute.patch('/users/:id/friends/:friendId', authentication, acceptingFriendRequest);

module.exports = { userRoute };
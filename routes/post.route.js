const express = require('express');
const { PostModel } = require('../models/post.model');
const { authentication } = require('../middlewares/authentication.middleware');
const { postingNewPost } = require('../controllers/post.controllers');





const postRoute = express.Router();


postRoute.post('/posts',authentication,postingNewPost);


module.exports = { postRoute };
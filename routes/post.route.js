const express = require('express');
const { PostModel } = require('../models/post.model');
const { authentication } = require('../middlewares/authentication.middleware');
const { postingNewPost, fetchingPost, patchingPost, deletingPost } = require('../controllers/post.controllers');





const postRoute = express.Router();

postRoute.get('/posts', fetchingPost);

postRoute.post('/posts', authentication, postingNewPost);

postRoute.patch('/posts/:id', authentication, patchingPost);

postRoute.delete('/posts/:id',authentication,deletingPost);

module.exports = { postRoute };
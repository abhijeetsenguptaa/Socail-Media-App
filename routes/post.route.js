const express = require('express');
const { PostModel } = require('../models/post.model');
const { authentication } = require('../middlewares/authentication.middleware');
const { postingNewPost, fetchingPost, patchingPost, deletingPost, fetchingSpecificPost, likingPosts, commentingOnPost } = require('../controllers/post.controllers');





const postRoute = express.Router();

postRoute.get('/posts', fetchingPost);

postRoute.get('/posts/:id', fetchingSpecificPost);

postRoute.post('/posts', authentication, postingNewPost);

postRoute.post('/posts/:id/likes', authentication, likingPosts);

postRoute.post('/posts/:id/comment', authentication, commentingOnPost);

postRoute.patch('/posts/:id', authentication, patchingPost);

postRoute.delete('/posts/:id', authentication, deletingPost);

module.exports = { postRoute };
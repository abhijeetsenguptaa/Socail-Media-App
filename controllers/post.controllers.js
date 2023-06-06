const { PostModel } = require('../models/post.model');
async function fetchingPost(req, res) {
    try {
        const postsData = await PostModel.find();
        res.status(200).send({
            status: true,
            msg: 'List of all the Posts.',
            data: postsData
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in fetching the data of the posts.'
        })
    }
}
async function fetchingSpecificPost(req, res) {
    try {
        const id = req.params.id;
        const postsData = await PostModel.find({ _id: id });
        res.status(200).send({
            status: true,
            msg: `Your specific post with ID : ${id}`,
            data: postsData
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in fetching the data of the specific posts.'
        })
    }
}


async function postingNewPost(req, res) {
    try {
        const { userID, text, image, createdAt, likes, comments } = req.body;
        const newPost = new PostModel({ user : userID, text, image, createdAt, likes, comments });
        await newPost.save();
        res.status(200).send({
            status: true,
            msg: 'You have posted a new Post.',
            data: await PostModel.find()
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in posting a new Post.'
        })
    }
}


async function patchingPost(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        await PostModel.findByIdAndUpdate({ _id: id }, data);
        res.status(200).send({
            status: true,
            msg: `Your Post with ID ${id} has been updated.`
        })
    } catch {
        res.status(500).send({
            status: false,
            msg: 'Error in updating the Post.'
        })
    }
}

async function deletingPost(req, res) {
    try {
        const id = req.params.id;
        await PostModel.findByIdAndDelete({ _id: id });
        res.status(200).send({
            status: true,
            msg: `Post with ID: ${id} has been deleted`,
            data: await PostModel.find()
        })
    } catch {
        res.status(500).send({
            status: false,
            msg: 'Error in deleting the Post.'
        })
    }
}



async function likingPosts(req, res) {
    try {
        const id = req.params.id;
        const { userID } = req.body
        const data = await PostModel.updateOne({ _id: id }, { $push: { likes: userID } });
        res.status(200).send({
            status: true,
            msg: 'You have liked a Post!',
            data: data
        })
    } catch {
        res.status(500).send({
            status: false,
            msg: 'Error in liking the post.'
        })
    }
}


async function commentingOnPost(req, res) {
    try {
        const { userID, text, createdAt } = req.body;
        const id = req.params.id;
        const data = await PostModel.updateOne({ _id: id }, { $push: { comments: { user : userID, text, createdAt } } });
        res.status(200).send({
            status: true,
            msg: 'You have commented on a Post!',
            data: data
        })
    } catch {
        res.status(500).send({
            status: false,
            msg: 'Error in commenting on the post.'
        })
    }
}
module.exports = { fetchingPost, postingNewPost, patchingPost, deletingPost, fetchingSpecificPost, likingPosts, commentingOnPost };
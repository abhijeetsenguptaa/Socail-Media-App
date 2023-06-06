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


async function postingNewPost(req, res) {
    try {
        const { userID, text, image, createdAt, likes, comments } = req.body;
        const newPost = new PostModel({ userID, text, image, createdAt, likes, comments });
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
    try{
        const id = req.params.id;
        await PostModel.findByIdAndDelete({_id:id});
        res.status(200).send({
            status : true,
            msg : `Post with ID: ${id} has been deleted`,
            data : await PostModel.find()
        })
    }catch{
        res.status(500).send({
            status : false,
            msg : 'Error in deleting the Post.'
        })
    }
}

module.exports = { fetchingPost, postingNewPost, patchingPost, deletingPost };
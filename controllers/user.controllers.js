const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');
const { PostModel } = require('../models/post.model');





async function registeringUser(req, res) {
    try {
        const { name, email, password, dob, bio } = req.body;
        const searchUser = await UserModel.find({ email });
        if (searchUser.length >= 1) {
            res.status(201).send({
                status: false,
                msg: "User's email-id already exists."
            })
        } else {
            bcrypt.hash(password, 6, async (err, hash) => {
                const user = new UserModel({ name, email, password: hash, dob, bio });
                await user.save();
                res.status(200).send({
                    status: true,
                    msg: "User registered Successfully."
                })
            })
        }
    } catch {
        res.status(404).send({
            status: false,
            msg: "Error in registration of the new User."
        })
    }
}



async function loggingUser(req, res) {
    try {
        const { email, password } = req.body;
        const searchRegisteredUser = await UserModel.find({ email });
        if (searchRegisteredUser.length >= 1) {
            bcrypt.compare(password, searchRegisteredUser[0].password, async (err, result) => {
                if (result) {
                    const token = jsonwebtoken.sign({ "user-id": searchRegisteredUser[0]._id }, process.env.secret_key, { expiresIn: '7d' });
                    res.status(200).send({
                        status: true,
                        msg: 'Logged In Successfully',
                        token: token,
                        data: searchRegisteredUser[0]
                    })
                } else {
                    res.status(404).send({
                        status: false,
                        msg: 'Wrong Credentials!'
                    })
                }
            })
        } else {
            res.status(404).send({
                status: false,
                msg: 'Email-ID not Found!'
            })
        }
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in logging In.'
        })
    }
}



async function fetchingRegisteredUser(req, res) {
    try {
        const users = await UserModel.aggregate([{ $lookup: { from: "posts", localField: "_id", foreignField: "userID", as: "posts" } }])
        res.status(200).send({
            status: true,
            msg: 'List of all the registered Users.',
            data: users
        })
    } catch {
        res.status(501).send({
            status: false,
            msg: 'Error in fetching the data of the Registered Users.'
        })
    }
}

async function fetchingFriendsList(req, res) {
    try {
        const id = req.params.id;
        const data = await UserModel.find({ _id: id });
        res.status(200).send({
            status: true,
            msg: "Your Complete Friend List.",
            data: data[0].friends
        })
    } catch {
        res.status(500).send({
            status: false,
            msg: 'Error in fetching the friends List.'
        })
    }
}


async function sendFriendRequest(req, res) {
    try {
        const id = req.params.id;
        const user = await UserModel.find({ _id: id });
        const userName = user[0].name;
        const { userID } = req.body;
        await UserModel.updateOne({ _id: id }, { $push: { friendRequests: userID } });
        res.status(200).send({
            status: true,
            msg: `You have send a friend Request to ${userName}`
        })
    } catch {
        res.status(500).send({
            status: false,
            msg: 'Error in sending a friend Request.'
        })
    }
}

async function acceptingFriendRequest(req, res) {
    try {
        const id = req.params.id;
        const friendsId = req.params.friendId;
        await UserModel.updateOne({ _id: id }, { $push: { friends: friendsId } });
        await UserModel.updateOne({ _id: friendsId }, { $push: { friends: id } });
        await UserModel.updateOne({ _id: id }, { $pull: { friendRequests: friendsId } });
        res.status(200).send({
            status: true,
            msg: 'You have accepted the friend Request.'
        })
    } catch {
        res.status(500).send({
            status: false,
            msg: 'Error in accepting the friend Request'
        })
    }
}
module.exports = { registeringUser, loggingUser, fetchingRegisteredUser, fetchingFriendsList, sendFriendRequest, acceptingFriendRequest };
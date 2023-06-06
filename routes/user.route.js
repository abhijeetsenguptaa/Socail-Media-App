require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');



const userRoute = express.Router();


userRoute.post('/register', async (req, res) => {
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
})

// This route will be used to log in the registered User.
userRoute.post('/login', async (req, res) => {
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
})
// This route will be used to log in the registered User.

// This route will be used to send the friend request to the other user.

// This route will be used to send the friend request to the other user.

// This route will be used to get all the registered Users.
userRoute.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
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
})

module.exports = { userRoute };
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [String],                                   //post-id from the posts
    friends: [String],                                 //user-id of the users
    friendRequests: [String]                           //user-id of the users
}, {
    versionKey: false
})



const UserModel = mongoose.model('users', userSchema);


module.exports = { UserModel };
const mongoose = require('mongoose');

const postSchema = {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'posts'
}

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [postSchema],                                                                            //post-id from the posts
    friends: [{type : mongoose.Schema.Types.ObjectId,ref:'users'}],                                 //user-id of the users
    friendRequests: [{type : mongoose.Schema.Types.ObjectId,ref:'users'}]                           //user-id of the users
},{
    versionKey : false
})



const UserModel = mongoose.model('users', userSchema);


module.exports = { UserModel };
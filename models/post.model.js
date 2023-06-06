const mongoose = require('mongoose');



const postSchema = mongoose.Schema({
    userID: String,
    text: String,
    image: String,
    createdAt: Date,
    likes: [String],                                 //user-id of the users
    comments: [{                                     //user-id of the users
        userID: String,
        text: String,
        createdAt: Date
    }]
}, {
    versionKey: false
})



const PostModel = mongoose.model('posts', postSchema);



module.exports = { PostModel };
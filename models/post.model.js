const mongoose = require('mongoose');



const postSchema = mongoose.Schema({
    userID: String,
    text: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [String],                                 //user-id of the users
    comments: [{                                     //user-id of the users
        userID: String,
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    versionKey: false
})



const PostModel = mongoose.model('posts', postSchema);



module.exports = { PostModel };
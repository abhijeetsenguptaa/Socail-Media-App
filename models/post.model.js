const mongoose = require('mongoose');



const postSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    text: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],                                 //user-id of the users
    comments: [{                                     //user-id of the users
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
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
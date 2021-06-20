const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: String,
        required: true
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
});

const CommentNoUser = mongoose.model('CommentNoUser', commentSchema);

module.exports = {
    CommentNoUser
}
const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
}, {timestamps: true}) //createdAt and UpdatedAt

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
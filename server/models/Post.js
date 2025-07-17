const mongoose = require('mongoose')
const validator = require('validator')

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: validator.isURL,
            message: 'Image should be a valid URL'
        }
    },
    content: {
        type: String,
        required: true,
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment'
    }]
}, {timestamps: true}) //createdAt and UpdatedAt

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
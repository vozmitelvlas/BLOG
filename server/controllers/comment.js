const Comment = require('../models/Comment')
const Post = require('../models/Post')


async function addComment(postId, comment) {
    const newComment = await Comment.create(comment)

    await Post.findByIdAndUpdate(postId, {$push: {comments: newComment}})

    return newComment.populate('author')
}

async function deleteComment(postId, commentId) {
    await Comment.deleteOne({_id: commentId})
    await Post.findByIdAndUpdate(postId, {$pull: {comments: commentId}})
}


module.exports = {
    addComment,
    deleteComment,
}
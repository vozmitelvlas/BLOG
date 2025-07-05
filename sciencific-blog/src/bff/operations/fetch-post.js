import {getComments, getPost, getUsers} from "../api";
import {getPostCommentsWithAuthor} from "../utils/index.js";

export const fetchPost = async (postId) => {
    let post
    let error

    try {
        post = await getPost(postId)
    } catch (postError) {
        error = postError
    }

    if (error) {
        return {
            error,
            res: null,
        }
    }

    const postCommentsWithAuthor = await getPostCommentsWithAuthor(postId)

    return {
        errors: null,
        res: {
            ...post,
            comments: postCommentsWithAuthor,
        },
    }
}
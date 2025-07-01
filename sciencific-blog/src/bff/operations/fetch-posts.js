import {getComments, getPosts} from "../api";
import {getCommentsCount} from "../utils/index.js";

export const fetchPosts = async (page, limit) => {
    const [{posts, lastPage}, comments] = await Promise.all([getPosts(page, limit), getComments()])

    return {
        errors: null,
        res: {
            posts: posts.map((post) => ({
                ...post,
                commentsCount: getCommentsCount(comments, post.id)
            })),
            lastPage,
        },
    }
}
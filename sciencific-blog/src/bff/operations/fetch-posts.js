import {getComments, getPosts} from "../api";
import {getCommentsCount} from "../utils";

export const fetchPosts = async (searchPhrase, page, limit) => {
    const [{posts, links}, comments] = await Promise.all([
        getPosts(searchPhrase, page, limit),
        getComments()
    ])

    return {
        errors: null,
        res: {
            posts: posts.map((post) => ({
                ...post,
                commentsCount: getCommentsCount(comments, post.id)
            })),
            links,
        },
    }
}
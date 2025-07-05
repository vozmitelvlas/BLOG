import {addComment, getComments, getPost, getUsers} from "../api/index.js";
import {ROLE} from "../constants/index.js";
import {sessions} from "../sessions.js";
import {getPostCommentsWithAuthor} from "../utils/index.js";

export const addPostComment = async (hash, userId, postId, content) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]

    const access = await sessions.access(hash, accessRoles)
    if (!access) {
        return {
            error: 'Доступ запрещён',
            res: null,
        }
    }

    await addComment(userId, postId, content)


    const post = await getPost(postId)
    const postCommentsWithAuthor = await getPostCommentsWithAuthor(postId)

    return {
        errors: null,
        res: {
            ...post,
            comments: postCommentsWithAuthor,
        },
    }
}
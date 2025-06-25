import {addComment, getComments, getPost} from "../api/index.js";
import {ROLE} from "../constants/index.js";
import {sessions} from "../sessions.js";

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
    const comments = await getComments(postId)

    return {
        error: null,
        res: {
            ...post,
            comments,
        },
    }
}
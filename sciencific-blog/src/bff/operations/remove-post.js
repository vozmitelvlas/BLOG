import {ROLE} from "../constants/index.js";
import {sessions} from "../sessions.js";
import {deleteComment, deletePost, getComments} from "../api";

export const removePost = async (hash, id) => {
    const accessRoles = [ROLE.ADMIN]

    const access = await sessions.access(hash, accessRoles)
    if (!access) {
        return {
            error: 'Доступ запрещён',
            res: null,
        }
    }

    await deletePost(id)
    const comments = await getComments(id)

    await Promise.all(comments.map(({id: commentId}) => deleteComment(commentId)))


    return {
        error: null,
        res: true,
    }
}
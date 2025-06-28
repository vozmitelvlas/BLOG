import {ROLE} from "../constants";
import {sessions} from "../sessions.js";
import {updatePost} from "../api";

export const savePost = async (hash, newPostData) => {
    const accessRoles = [ROLE.ADMIN]
    const access = await sessions.access(hash, accessRoles)
    if (!access) {
        return {
            error: 'Доступ запрещён',
            res: null,
        }
    }

    const updatedPost = await updatePost(newPostData)

    return {
        error: null,
        res: updatedPost,
    }
}
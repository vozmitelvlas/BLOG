import {ROLE} from "../constants/index.js";
import {sessions} from "../sessions.js";
import {deleteUser} from "../api";

export const removeUser = async (userSession, userId) => {
    const accessRoles = [ROLE.ADMIN]

    if (!sessions.access(userSession, accessRoles)) {
        return {
            error: 'Доступ запрещён',
            res: null,
        }
    }

    deleteUser(userId)

    return {
        error: null,
        res: true,
    }
}
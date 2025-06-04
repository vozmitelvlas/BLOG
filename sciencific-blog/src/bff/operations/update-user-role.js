import {setUserRole} from "../api";
import {sessions} from "../sessions.js";
import {ROLE} from "../constants";

export const updateUserRole = async (userSession, userId, newUserRoleId) => {
    const accessRoles = [ROLE.ADMIN]
    if (!sessions.access(userSession, accessRoles)) {
        return {
            error: 'Доступ запрещён',
            res: null,
        }
    }

    await setUserRole(userId, newUserRoleId)

    return {
        error: null,
        res: true,
    }
}
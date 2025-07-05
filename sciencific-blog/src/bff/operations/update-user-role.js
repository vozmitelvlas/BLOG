import {setUserRole} from "../api";
import {sessions} from "../sessions.js";
import {ROLE} from "../constants";

export const updateUserRole = async (hash, userId, newUserRoleId) => {
    const accessRoles = [ROLE.ADMIN]
    const access = await sessions.access(hash, accessRoles)
    if (!access) {
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
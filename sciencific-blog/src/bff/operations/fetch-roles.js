import {getRoles} from "../api/index.js";
import {sessions} from "../sessions.js";
import {ROLE} from "../constants/index.js";

export const fetchRoles = async (userSession) => {
    const accessRoles = [ROLE.ADMIN]

    if (!sessions.access(userSession, accessRoles)) {
        return {
            error: 'Доступ запрещён',
            res: null,
        }
    }

    const roles = await getRoles()

    return {
        errors: null,
        res: roles,
    }
}
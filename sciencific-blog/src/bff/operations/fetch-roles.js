import {getRoles} from "../api/index.js";
import {sessions} from "../sessions.js";
import {ROLE} from "../constants/index.js";

export const fetchRoles = async (hash) => {
    const accessRoles = [ROLE.ADMIN]

    const access = await sessions.access(hash, accessRoles)
    if (!access) {
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
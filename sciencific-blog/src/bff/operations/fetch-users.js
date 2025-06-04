import {getUsers} from "../api/index.js";
import {sessions} from "../sessions.js";
import {ROLE} from "../constants/index.js";

export const fetchUsers = async (userSession) => {
    const accessRoles = [ROLE.ADMIN]

    if (!sessions.access(userSession, accessRoles)) {
        return {
            error: 'Доступ запрещён',
            res: null,
        }
    }

    const users = await getUsers()

    return {
        errors: null,
        res: users,
    }
}
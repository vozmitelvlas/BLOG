import {getUser} from "./get-user.js";
import {addUser} from "./add-user.js";
import {sessions} from "./sessions.js";

export const server = {
    async authorize(authLogin, authPassword) {
        const user = await getUser(authLogin)

        if (!user) {
            return {
                error: 'Такой пользователь не найден',
                res: null,
            }
        }
        if (authPassword !== user.password) {
            return {
                error: 'Неверный пароль',
                res: null,
            }
        }

        return {
            error: null,
            res: {
                id: user.id,
                login: user.login,
                roleId: user.role_id,
                session: sessions.create(user)
            },
        }
    },

    async register(regLogin, regPassword) {
        const user = await getUser(regLogin)

        if (user) {
            return {
                error: 'Такой логин уже занят',
                res: null,
            }
        }

        await addUser(regLogin, regPassword)

        return {
            error: null,
            res: {
                id: user.id,
                login: user.login,
                roleId: user.role_id,
                session: sessions.create(user)
            },
        }
    },

    async logout(session) {
        sessions.remove(session)
    }
}
import {ACTION_TYPE} from "./action-type.js";
import {server} from "../bff/index.js";

export const setUser = (user) => ({
    type: ACTION_TYPE.SET_USER,
    payload: user,
})

export const  logout = (session) => {
    server.logout(session).then(r => {})

    return {
        type: ACTION_TYPE.LOGOUT
    }
}
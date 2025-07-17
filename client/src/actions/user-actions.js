import {ACTION_TYPE} from "./action-type.js";
import apiClient from "../utils/apiClient.js";

export const setUser = (user) => ({
    type: ACTION_TYPE.SET_USER,
    payload: user,
})

export const logout = () => async (dispatch) => {
    apiClient('/logout', 'POST').then(() => {
        dispatch({
            type: ACTION_TYPE.LOGOUT
        })
    })
}
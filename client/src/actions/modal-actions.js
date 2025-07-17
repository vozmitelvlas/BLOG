import {ACTION_TYPE} from "./action-type.js";

export const CLOSE_MODAL = {
    type: ACTION_TYPE.CLOSE_MODAL
}

export const openModal = (modalParams) => ({
    type: ACTION_TYPE.OPEN_MODAL,
    payload: modalParams
})
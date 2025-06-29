import {ACTION_TYPE} from "../actions/index.js";

const initialPostState = {
    id: "",
    title: "",
    imageUrl: "",
    publishedAt: "",
    content: "",
    comments: [],
}

export const postReducer = (state = initialPostState, action) => {

    switch (action.type){
        case ACTION_TYPE.SET_POST_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case ACTION_TYPE.RESET_POST_DATA:
            return initialPostState
        default:
            return state
    }
}
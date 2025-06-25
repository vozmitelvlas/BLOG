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
        default:
            return state
    }
}
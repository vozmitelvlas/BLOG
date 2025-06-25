import {ACTION_TYPE} from "./action-type.js";

export const setPostData = (postData) => ({
    type: ACTION_TYPE.SET_POST_DATA,
    payload: postData
})

export const loadPostAsync = (requestServer, postId) => (dispatch) => {
    requestServer('fetchPost', postId).then((postData) => {
            dispatch(setPostData(postData.res))
        }
    )
}

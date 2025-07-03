import {ACTION_TYPE} from "./action-type.js";

export const setPostData = (postData) => ({
    type: ACTION_TYPE.SET_POST_DATA,
    payload: postData
})

export const loadPostAsync = (requestServer, postId) => (dispatch) =>
    requestServer('fetchPost', postId).then((postData) => {
            if (postData.res)
                dispatch(setPostData(postData.res))

            return postData
        }
    )

export const savePostAsync = (requestServer, newPostData) => (dispatch) =>
    requestServer('savePost', newPostData).then(updatedPost => {
        dispatch(setPostData(updatedPost.res))
        return updatedPost.res
    })


export const removePostAsync = (requestServer, id) => () =>
    requestServer("removePost", id)

export const RESET_POST_DATA = {
    type: ACTION_TYPE.RESET_POST_DATA,
}
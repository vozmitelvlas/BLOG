import {ACTION_TYPE} from "./action-type.js";
import apiClient from "../utils/apiClient.js";

export const setPostData = (postData) => ({
    type: ACTION_TYPE.SET_POST_DATA,
    payload: postData
})

export const loadPostAsync = (postId) => (dispatch) =>
    apiClient(`/posts/${postId}`).then((postData) => {
        if (postData.data)
            dispatch(setPostData(postData.data))

        return postData
    })

export const savePostAsync = (id, newPostData) => (dispatch) => {
    const saveRequest = id ?
        apiClient(`/posts/${id}`, 'PATCH', newPostData) :
        apiClient('/posts', 'POST', newPostData)

    return saveRequest.then(updatedPost => {
        dispatch(setPostData(updatedPost.data))
        return updatedPost.data
    })
}


export const removePostAsync = (id) => () =>
    apiClient(`/posts/${id}`, 'DELETE')

export const RESET_POST_DATA = {
    type: ACTION_TYPE.RESET_POST_DATA,
}
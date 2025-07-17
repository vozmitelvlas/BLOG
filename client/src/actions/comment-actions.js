import apiClient from "../utils/apiClient.js";
import {ACTION_TYPE} from "./action-type.js";

export const addComment = (comment) => ({
    type: ACTION_TYPE.ADD_COMMENT,
    payload: comment,
})

export const removeComment = (commentId) => ({
    type: ACTION_TYPE.REMOVE_COMMENT,
    payload: commentId,
})
export const addCommentAsync = (postId, content) => (dispatch) =>
    apiClient(`/posts/${postId}/comments`, 'POST', {content}).then((comment) => {
        dispatch(addComment(comment.data))
    })

export const removeCommentAsync = (postId, id) => (dispatch) => {
    apiClient(`/posts/${postId}/comments/${id}`, 'DELETE').then(() => {
            dispatch(removeComment(id))
        }
    )
}


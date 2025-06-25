import {setPostData} from "./post-actions.js";

export const addCommentAsync = (requestServer, userId, postId, content) => (dispatch) =>
    requestServer("addPostComment", userId, postId, content).then((postData) => {
        dispatch(setPostData(postData.res))
    })

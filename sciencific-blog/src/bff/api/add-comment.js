import {generateDate} from "../utils/index.js";

export const addComment = (userId, postId, content) =>
    fetch('http://localhost:3005/comments', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            author_id: userId,
            post_id: postId,
            published_at: generateDate(),
            content,
        })
    })
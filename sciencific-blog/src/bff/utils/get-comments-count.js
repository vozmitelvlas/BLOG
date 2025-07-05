export const getCommentsCount = (comments = [], postId) =>
    comments.filter((comment) => comment.postId === postId).length

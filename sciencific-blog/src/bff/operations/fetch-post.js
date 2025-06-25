import {getComments, getPost, getUsers} from "../api";

export const fetchPost = async (postId) => {
    const post = await getPost(postId)
    const comments = await getComments(postId)
    const users = await getUsers()

    const commentsWithAuthor = comments.map((comment) => {
        const user = users.find(({id}) => id === comment.authorId)
        console.log(user.login)

        return {
            ...comment,
            author: user?.login,
        }
    })

    return {
        errors: null,
        res: {
            ...post,
            comments: commentsWithAuthor,
        },
    }
}
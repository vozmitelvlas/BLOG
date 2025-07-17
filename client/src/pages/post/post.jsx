import {Comments, PostContent, PostForm} from "./components";
import {loadPostAsync, RESET_POST_DATA} from "../../actions";
import {useEffect, useLayoutEffect, useState} from "react";
import {useParams, useMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectPost} from "../../selectors";
import styled from "styled-components";
import {Error, PrivateContent} from "../../components";
import {ROLE} from "../../constants";

const PostContainer = ({className}) => {
    const isCreating = !!useMatch('/post')
    const isEditing = !!useMatch('/post/:id/edit')
    const [isLoading, setIsLoading] = useState(true)
    const post = useSelector(selectPost)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [error, setError] = useState(null)

    useLayoutEffect(() => {
        dispatch(RESET_POST_DATA)
    }, [isCreating])

    useEffect(() => {
        if (isCreating) {
            setIsLoading(false)
            return
        }

        dispatch(loadPostAsync(id)).then(postData => {
            setError(postData.error)
            setIsLoading(false)
        })
    }, [isCreating])


    if (isLoading)
        return null

    const SpecificPostPage = isCreating || isEditing ? (
        <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
            <div className={className}>
                <PostForm post={post}/>
            </div>
        </PrivateContent>
    ) : (
        <div className={className}>
            <PostContent post={post}/>
            <Comments comments={post.comments} postId={post.id}/>
        </div>
    )

    return error ? <Error error={error}/> : SpecificPostPage
}

export const Post = styled(PostContainer)`
  padding: 0 80px;
  margin: 40px 0;
`
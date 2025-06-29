import {Comments, PostContent, PostForm} from "./components";
import {loadPostAsync, RESET_POST_DATA} from "../../actions";
import {useParams, useMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useLayoutEffect} from "react";
import {useServerRequest} from "../../hooks";
import {selectPost} from "../../selectors";
import styled from "styled-components";

const PostContainer = ({className}) => {
    const isEditing = useMatch('/post/:id/edit')
    const isCreating = useMatch('/post')
    const requestServer = useServerRequest()
    const post = useSelector(selectPost)
    const dispatch = useDispatch()
    const {id} = useParams()

    useLayoutEffect(() => {
        dispatch(RESET_POST_DATA)
    }, [isCreating])

    useEffect(() => {
        if(isCreating) return

        dispatch(loadPostAsync(requestServer, id))
    }, [isCreating])

    return (
        <div className={className}>
            {isCreating || isEditing ? (
                <PostForm post={post}/>
            ) : (
                <>
                    <PostContent post={post}/>
                    <Comments comments={post.comments} postId={post.id}/>
                </>
            )}
        </div>
    )
}

export const Post = styled(PostContainer)`
  padding: 0 80px;
  margin: 40px 0;
`
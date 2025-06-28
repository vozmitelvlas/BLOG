import {useDispatch, useSelector} from "react-redux";
import {Comments, PostContent, PostForm} from "./components";
import {useServerRequest} from "../../hooks";
import {loadPostAsync} from "../../actions";
import {useParams, useMatch} from "react-router-dom";
import {selectPost} from "../../selectors";
import {useEffect} from "react";
import styled from "styled-components";

const PostContainer = ({className}) => {
    const requestServer = useServerRequest()
    const dispatch = useDispatch()
    const post = useSelector(selectPost)
    const {id} = useParams()
    const isEditing = useMatch('/post/:id/edit')

    useEffect(() => {
        console.log("hihihihihi")
        dispatch(loadPostAsync(requestServer, id))
    }, [requestServer, dispatch])

    return (
        <div className={className}>
            {isEditing ? (
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
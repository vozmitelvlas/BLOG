import {useDispatch, useSelector} from "react-redux";
import {Comments, PostContent} from "./components";
import {useServerRequest} from "../../hooks";
import {loadPostAsync} from "../../actions";
import {useParams} from "react-router-dom";
import {selectPost} from "../../selectors";
import {useEffect} from "react";
import styled from "styled-components";

const PostContainer = ({className}) => {
    const requestServer = useServerRequest()
    const dispatch = useDispatch()
    const post = useSelector(selectPost)
    const {id} = useParams()

    useEffect(() => {
        dispatch(loadPostAsync(requestServer, id))
    }, [requestServer, dispatch])

    return (
        <div className={className}>
            <PostContent post={post}/>
            <Comments comments={post.comments} postId={post.id}/>
        </div>
    )
}

export const Post = styled(PostContainer)`
  padding: 0 80px;
  margin: 40px 0;
`
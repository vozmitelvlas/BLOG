import styled from "styled-components";
import {useState} from "react";
import {Icon} from "../../../../components";
import {Comment} from "./components";
import {useDispatch, useSelector} from "react-redux";
import {selectUserRole} from "../../../../selectors";
import {addCommentAsync} from "../../../../actions";
import {PROP_TYPE, ROLE} from "../../../../constants/index.js";
import PropTypes from "prop-types";

const CommentsContainer = ({className, comments, postId}) => {
    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState("")
    const userRole = useSelector(selectUserRole)

    const onNewCommentAdd = (postId, content) => {
        dispatch(addCommentAsync(postId, content))
        setNewComment("")
    }

    const isGuest = userRole === ROLE.GUEST

    return (
        <div className={className}>
            {!isGuest && (
                <div className="new-comment">
                <textarea
                    value={newComment}
                    placeholder="Комментарий..."
                    onChange={({target}) => setNewComment(target.value)}>
                </textarea>
                    <Icon
                        id="fa-paper-plane-o"
                        margin="0 0 0 5px"
                        size="18px"
                        onClick={() => onNewCommentAdd(postId, newComment)}
                    />
                </div>
            )}

            <div className="comments">
                {comments.map(({id, author, content, publishedAt}) => (
                    <Comment
                        key={id}
                        postId={postId}
                        id={id}
                        author={author}
                        content={content}
                        publishedAt={publishedAt}
                    />
                ))}
            </div>
        </div>
    )
}

export const Comments = styled(CommentsContainer)`
  margin: 20px auto 0 auto;
  width: 580px;

  .new-comment {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
  }

  textarea {
    width: 555px;
    resize: none;
    min-height: 100px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    font-size: 18px;
  }
`

Comments.propTypes = {
    comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
    postId: PropTypes.string.isRequired,
}
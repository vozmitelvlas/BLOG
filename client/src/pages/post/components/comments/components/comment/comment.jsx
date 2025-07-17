import styled from "styled-components";
import {Icon} from "../../../../../../components";
import {CLOSE_MODAL, openModal, removeCommentAsync} from "../../../../../../actions";
import {useDispatch, useSelector} from "react-redux";
import {selectUserRole} from "../../../../../../selectors";
import {ROLE} from "../../../../../../constants";
import PropTypes from "prop-types";

const CommentContainer = ({className, id, author, publishedAt, content, postId}) => {
    const dispatch = useDispatch()
    const userRole = useSelector(selectUserRole)

    const onCommentRemove = (id) => {
        dispatch(openModal({
            text: 'Удалить комментарий?',
            onConfirm: () => {
                dispatch(removeCommentAsync(postId, id))
                dispatch(CLOSE_MODAL)
            },
            onCancel: () => dispatch(CLOSE_MODAL)
        }))
    }

    const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole)

    return (
        <div className={className}>
            <div className="comment">
                <div className="information-panel">
                    <div className="author">
                        <Icon id="fa-user-circle-o" margin="0 5px 0 5px" size="18px" inactive={true}/>
                        {author}
                    </div>
                    <div className="published-at">
                        <Icon id="fa-calendar-o" margin="0 5px 0 0" size="18px" inactive={true}/>
                        {publishedAt}
                    </div>
                </div>
                <div className="comment-text">{content}</div>
            </div>
            {isAdminOrModerator &&
                <Icon
                    id="fa-trash-o"
                    margin="5px 0 0 5px"
                    size="18px"
                    onClick={() => onCommentRemove(id)}
                />
            }

        </div>
    )
}

export const Comment = styled(CommentContainer)`
  display: flex;
  margin-top: 10px;

  .comment {
    width: 555px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .information-panel {
    display: flex;
    justify-content: space-between;
  }

  .author {
    display: flex;
  }

  .published-at {
    display: flex;
  }
`

Comment.propTypes = {
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
}
import styled from "styled-components";
import {Icon} from "../../../../../../components";

const CommentContainer = ({className, id, author, publishedAt, content}) => {
    return (
        <div className={className}>
            <div className="comment">
                <div className="information-panel">
                    <div className="author">
                        <Icon id="fa-user-circle-o" margin="0 5px 0 5px" size="18px"/>
                        {author}
                    </div>
                    <div className="published-at">
                        <Icon id="fa-calendar-o" margin="0 5px 0 0" size="18px"/>
                        {publishedAt}
                    </div>
                </div>
                <div className="comment-text">{content}</div>
            </div>
            <Icon
                id="fa-trash-o"
                margin="5px 0 0 5px"
                size="18px"
                onClick={() => {}}
            />

        </div>
    )
}

export const Comment = styled(CommentContainer)`
  display: flex;
  margin-top: 10px;
  
  .comment{
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
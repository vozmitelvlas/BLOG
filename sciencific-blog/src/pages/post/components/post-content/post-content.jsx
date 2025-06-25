import styled from "styled-components";
import {H2, Icon} from "../../../../components";

const PostContentContainer = ({className, post: {id, title, imageUrl, content, publishedAt}}) => {
    return (
        <div className={className}>
            <img src={imageUrl || null} alt={title}/>
            <H2>{title}</H2>
            <div className="special-panel">
                <div className="published-at">
                    <Icon id="fa-calendar-o" margin="0 10px 0 0" size="18px"/>
                    {publishedAt}
                </div>
                <div className="buttons">
                    <Icon id="fa-pencil-square-o" margin="0 10px 0 0" size="21px"/>
                    <Icon id="fa-trash-o" size="21px" />
                </div>
            </div>
            <div className="post-text">{content}</div>
        </div>
    )
}

export const PostContent = styled(PostContentContainer)`
  font-size: 18px;

  img {
    float: left;
    margin: 0 20px 5px 0;
  }

  .special-panel {
    display: flex;
    justify-content: space-between;
    margin: -20px 0 5px;
  }

  .published-at {
    display: flex;
  }

  .buttons {
    display: flex;
  }
`
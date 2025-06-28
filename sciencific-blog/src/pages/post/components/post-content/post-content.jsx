import styled from "styled-components";
import {H2, Icon} from "../../../../components";
import {SpecialPanel} from "../special-panel/special-panel.jsx";
import {useNavigate} from "react-router-dom";

const PostContentContainer = ({className, post: {id, title, imageUrl, content, publishedAt}}) => {
    const navigate = useNavigate()
    return (
        <div className={className}>
            <img src={imageUrl || null} alt={title}/>
            <H2>{title}</H2>
            <SpecialPanel publishedAt={publishedAt} margin="20px 0 20px" editButton={
                <Icon id="fa-pencil-square-o" margin="0 10px 0 0" size="21px"
                      onClick={() => navigate(`/post/${id}/edit`)}/>
            }/>
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

  .post-text {
    white-space: break-spaces;
  }
`
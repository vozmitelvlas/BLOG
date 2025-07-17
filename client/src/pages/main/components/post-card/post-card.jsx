import {Icon} from "../../../../components";
import styled from "styled-components";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const PostCardContainer = ({className, id, title, imageUrl, commentsCount, publishedAt}) => {
    return (
        <div className={className}>
            <Link to={`/post/${id}`}>
                <img src={imageUrl} alt={title}/>
                <div className="post-card-footer">
                    <h4>{title}</h4>
                    <div className="post-card-info">
                        <div className="published-at">
                            <Icon id="fa-calendar-o" size="18px" margin="0 5px 0 0" inactive={true}/>
                            {publishedAt}
                        </div>
                        <div className="comments-count">
                            <Icon id="fa-comment-o" size="18px" margin="0 10px 0 0" inactive={true}/>
                            {commentsCount}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export const PostCard = styled(PostCardContainer)`
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 20px;
  border: 1px solid #000;
  
  img {
    display: block;
    width: 100%;
  }
  
  h4{
    margin: 0;
  }
  
  .post-card-footer{
    padding: 5px;
    border-top: 1px solid #000;
  }
  
  .post-card-info{
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }
  
  .published-at{
    display: flex;
  }
  .comments-count{
    display: flex;
  }
`

PostCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired,
    publishedAt: PropTypes.string.isRequired,
}
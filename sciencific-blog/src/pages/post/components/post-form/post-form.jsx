import styled from "styled-components";
import {H2, Icon, Input} from "../../../../components";
import {SpecialPanel} from "../special-panel/special-panel.jsx";
import {useRef} from "react";
import {sanitizeContent} from "./utils/index.js";
import {useDispatch} from "react-redux";
import {savePostAsync} from "../../../../actions";
import {useNavigate} from "react-router-dom";
import {useServerRequest} from "../../../../hooks";

const PostFormContainer = ({className, post: {id, title, imageUrl, content, publishedAt}}) => {
    const requestServer = useServerRequest()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const imageRef = useRef(null)
    const contentRef = useRef(null)
    const titleRef = useRef(null)

    const onSave = () => {
        const newImageUrl = imageRef.current.value
        const newTitle = titleRef.current.value
        const newContent = sanitizeContent(contentRef.current.innerHTML)

        dispatch(savePostAsync(requestServer, {
            id,
            imageUrl: newImageUrl,
            title: newTitle,
            content: newContent,
        })).then(() => navigate(`/post/${id}`))
    }

    return (
        <div className={className}>
            <Input ref={imageRef} defaultValue={imageUrl} placeholder="Изображение..."/>
            <Input ref={titleRef} defaultValue={title} placeholder="Заголовок..."/>
            <SpecialPanel publishedAt={publishedAt} margin="20px 0" editButton={
                <Icon id="fa-floppy-o" margin="0 10px 0 0" size="21px" onClick={onSave}/>
            }/>
            <div
                ref={contentRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="post-text"
            >
                {content}
            </div>
        </div>
    )
}

export const PostForm = styled(PostFormContainer)`
  font-size: 18px;

  img {
    float: left;
    margin: 0 20px 5px 0;
  }

  .post-text {
    white-space: break-spaces;
  }
`
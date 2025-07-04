import styled from "styled-components";
import {H2, Icon, Input} from "../../../../components";
import {SpecialPanel} from "../special-panel/special-panel.jsx";
import {useLayoutEffect, useRef, useState} from "react";
import {sanitizeContent} from "./utils";
import {useDispatch} from "react-redux";
import {savePostAsync} from "../../../../actions";
import {useNavigate} from "react-router-dom";
import {useServerRequest} from "../../../../hooks";

const PostFormContainer = ({className, post: {id, title, imageUrl, content, publishedAt}}) => {
    const requestServer = useServerRequest()
    const contentRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [imageUrlValue, setImageUrlValue] = useState(imageUrl)
    const [titleValue, setTitleValue] = useState(title)

    useLayoutEffect(() => {
        setTitleValue(title)
        setImageUrlValue(imageUrl)
    }, [title, imageUrl])

    const onSave = () => {
        const newContent = sanitizeContent(contentRef.current.innerHTML)

        dispatch(savePostAsync(requestServer, {
            id,
            imageUrl: imageUrlValue,
            title: titleValue,
            content: newContent,
        })).then(({id}) => navigate(`/post/${id}`))
    }

    const onImageChange = ({target}) => setImageUrlValue(target.value)
    const onTitleChange = ({target}) => setTitleValue(target.value)

    return (
        <div className={className}>
            <Input value={imageUrlValue} placeholder="Изображение..." onChange={onImageChange}/>
            <Input value={titleValue} placeholder="Заголовок..." onChange={onTitleChange}/>
            <SpecialPanel
                id={id}
                publishedAt={publishedAt}
                margin="20px 0"
                editButton={
                    <Icon
                        id="fa-floppy-o"
                        size="21px"
                        margin="0 10px 0 0"
                        onClick={onSave}
                    />
                }
            />
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
    padding: 5px;
    min-height: 80px;
    border: 1px solid #000;
    white-space: break-spaces;
  }
`
import styled from "styled-components";
import {useEffect, useState} from "react";
import {useServerRequest} from "../../hooks/index.js";
import {PostCard} from "./components";

const MainContainer = ({className}) => {
    const requestServer = useServerRequest()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        requestServer('fetchPosts').then((posts) => {
            if (posts.error) return
            setPosts(posts.res)
        })
    }, [])

    return (
        <div className={className}>
            <div className="post-list">
                {posts.map(({id, title, publishedAt, commentsCount, imageUrl}) => (
                    <PostCard
                        key={id}
                        id={id}
                        title={title}
                        imageUrl={imageUrl}
                        publishedAt={publishedAt}
                        commentsCount={commentsCount}
                    />
                ))}
            </div>
        </div>
    )
}

export const Main = styled(MainContainer)`
  .post-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }

`
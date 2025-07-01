import {useEffect, useState} from "react";
import {useServerRequest} from "../../hooks";
import {Pagination, PostCard} from "./components";
import {PAGINATION_LIMIT} from "../../constants";
import styled from "styled-components";

const MainContainer = ({className}) => {
    const requestServer = useServerRequest()
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState([])
    const [lastPage, setLastPage] = useState(1)

    useEffect(() => {
        requestServer('fetchPosts', page, PAGINATION_LIMIT).then(({res: {posts, lastPage}}) => {
            setPosts(posts)
            setLastPage(lastPage)
        })
    }, [page])

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

            {lastPage > 1 && <Pagination setPage={setPage} page={page} lastPage={lastPage}/>}
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
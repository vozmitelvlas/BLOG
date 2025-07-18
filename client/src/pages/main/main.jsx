import {Pagination, PostCard, Search} from "./components";
import {PAGINATION_LIMIT} from "../../constants";
import {useEffect, useMemo, useState} from "react";
import {debounce} from "./utils";
import styled from "styled-components";
import apiClient from "../../utils/apiClient.js";

const MainContainer = ({className}) => {
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState([])
    const [lastPage, setLastPage] = useState(1)
    const [shouldSearch, setShouldSearch] = useState(false)
    const [searchPhrase, setSearchPhrase] = useState('')

    useEffect(() => {
        apiClient(`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`)
            .then(({data: {posts, lastPage}}) => {
                setPosts(posts)
                setLastPage(lastPage)
            })
    }, [page, shouldSearch])

    const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

    const onSearch = async ({target}) => {
        setSearchPhrase(target.value)
        await startDelayedSearch(!shouldSearch)
    }

    return (
        <div className={className}>
            <div className="post-and-search">
                <Search onChange={onSearch} searchPhrase={searchPhrase} onFocus={() => setPage(1)}/>
                {posts.length > 0 ? (
                    <div className="post-list">
                        {posts.map(({id, title, publishedAt, comments, imageUrl}) => (
                            <PostCard
                                key={id}
                                id={id}
                                title={title}
                                imageUrl={imageUrl}
                                publishedAt={publishedAt}
                                commentsCount={comments.length}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-posts-found">Статьи не найдены</div>
                )}
            </div>
            {lastPage > 1 && posts.length > 0 && <Pagination setPage={setPage} page={page} lastPage={lastPage}/>}
        </div>
    )
}

export const Main = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .post-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 20px 80px;
  }

  .no-posts-found {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
  }
`
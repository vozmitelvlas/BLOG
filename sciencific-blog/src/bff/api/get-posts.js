import {transformPost} from "../transformers";

export const getPosts = (page, limit) =>
    fetch(`http://localhost:3005/posts?_page=${page}&_per_page=${limit}`)
        .then(loadedPosts => {
            return loadedPosts.json()
        })
        .then((loadedPosts) => loadedPosts && ({
                posts: loadedPosts.data.map(transformPost),
                lastPage: loadedPosts.last
            })
        )
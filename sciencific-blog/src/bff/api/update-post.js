export const updatePost = ({id, imageUrl, title, content}) =>
    fetch(`http://localhost:3005/posts/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            image_url: imageUrl,
            title: title,
            content: content,
        }),
    }).then(loadedPost => loadedPost.json())
const { useState, useEffect } = React

import logic from '../../logic.js'

import Post from './Post.jsx'

function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('Posts -> useEffect')

        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handlePostLikeToggled = () => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostDeleted = () => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostTextEdited = () => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Posts -> render')

    return <section>
        {posts.map(post => <Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted} onPostTextEdited={handlePostTextEdited} />)}
    </section>
}

export default Posts
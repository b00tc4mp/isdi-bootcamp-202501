const { useState, useEffect } = React

// import Post from './Post.jsx'
import Post from './Post.jsx'

import logic from '../../logic.js'

function Posts() {
    const [posts, setPosts] = useState([])

    // Actualiza el nombre de usuario cuando se conecta
    useEffect(() => {
        console.debug('Posts -> useEffect')

        try {
            // Obtiene los datos de los posts de Logig
            const posts = logic.getPosts()

            // 
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
        <div className="end"></div>
    </section>
}

export default Posts
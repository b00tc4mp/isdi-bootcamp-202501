import { useState, useEffect } from 'react'

import { Post } from './Post.jsx'

import { logic } from '../../logic/index.js'

export function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('Post -> useEffect')

        try {
            logic.getPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },[])

    const handlePostLikeToggled = () => {
        try {
            logic.getPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostDeleted = () => {
        try {
            logic.getPosts() //en el getPosts de logic, retorno posts por eso es que los recibo aca
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            
            alert(error.message)
        }
    }

    const handlePostTextEdited = () => {
        try {
            logic.getPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    /*const handleSavePost = () => {
        try {
            const posts = logic.getPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }*/

    console.debug('Posts -> render')

    return <section>
    {posts.map(post => <Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted}  onPostTextEdited={handlePostTextEdited} /*onSavePost={handleSavePost}*//>)}
</section>
}

import { useState, useEffect } from 'react'

import { Post } from './Post.jsx'

import { logic } from '../../logic/index.js'
import { errors } from 'com'

import { useContext } from '../../context.js'

const {SystemError, ValidationError} = errors

export function Posts({targetUserId}) {
    const [posts, setPosts] = useState([])

    const {alert} = useContext()

    useEffect(() => {
        console.debug('Index -> useEffect')

        loadPosts()
    }, [targetUserId])

    const loadPosts = () => {
        try {
            (targetUserId ? logic.getUserPosts(targetUserId) : logic.getPosts())
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    if(error instanceof SystemError)
                        alert('⛔ ' + error.message)
                    else
                        alert('⚠️ ' + error.message)
                })
        } catch (error) {
            console.error(error)

            if(error instanceof ValidationError)
                alert('❌ ' + error.message)
            else
                alert('⛔ ' + error.message)
        }
    }

    const handlePostLikeToggled = () => loadPosts()

    const handlePostDeleted = () => loadPosts()

    const handlePostTextEdited = () => loadPosts()

    return <section>
        {posts.map(post => <Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted} onPostTextEdited={handlePostTextEdited} />)}
    </section>
}
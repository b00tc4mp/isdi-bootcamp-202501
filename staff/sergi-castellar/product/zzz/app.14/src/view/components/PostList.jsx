import { useState, useEffect } from 'react'

import {logic} from '../../logic/index'
import {Post} from './Post.jsx'

export function PostList() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
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
    }, [])

    const handlePostDeleted = () => { //TODO se repite
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

    const handlePostDescriptionEdited = () => { //TODO se repite
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

    const handlePostLikeToggled = () => { //TODO se repite
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
    
    return <section id="posts-section">
        {posts.toReversed().map(post => <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} onPostDescriptionEdited={handlePostDescriptionEdited} onPostLikeToggled={handlePostLikeToggled}/>)}
    </section>
}
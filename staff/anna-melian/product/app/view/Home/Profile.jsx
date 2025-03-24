/*

import { useState, useEffect } from 'react'

import { logic } from '../../logic/index.js'
import { MyPost } from './MyPost.jsx'

export function Profile() {
    const [myPosts, setPosts] = useState([])


    useEffect(() => {

        try {
            logic.getOwnPosts()
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


    const handleToggleLikePostClick = () => {
        try {
            logic.getOwnPosts()
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

    const handleDeletePostClick = () => {
        try {
            logic.getOwnPosts()
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

    const handleEditPostClick = () => {
        try {

            logic.getOwnPosts()
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


    return <section className="options">
        <h2>My Profile</h2>
        {myPosts.map(post =>
            <MyPost key={post.id} post={post} onPostLikeToggled={handleToggleLikePostClick} onPostDeleted={handleDeletePostClick} onPostEdited={handleEditPostClick} />)}

    </section >
}
*/



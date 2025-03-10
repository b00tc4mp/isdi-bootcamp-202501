import { useState, useEffect } from 'react'

import { logic } from "../../logic";
import { MyPost } from "../Home/MyPost.jsx";

export function Profile() {
    const [myPosts, setPosts] = useState([])


    useEffect(() => {

        try {
            const myPosts = logic.getOwnPosts()
            setPosts(myPosts)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }

    }, [])


    const handleToggleLikePostClick = () => {
        try {
            const myPosts = logic.getOwnPosts()

            setPosts(myPosts)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleDeletePostClick = () => {
        try {
            alert('Post deleted')

            const myPosts = logic.getOwnPosts()

            setPosts(myPosts)

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleEditPostClick = () => {
        try {

            const myPosts = logic.getOwnPosts()

            setPosts(myPosts)

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



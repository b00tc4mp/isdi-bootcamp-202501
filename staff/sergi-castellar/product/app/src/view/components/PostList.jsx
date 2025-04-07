import { useState, useEffect } from 'react'
import { useContext } from '../../context'
import { logic } from '../../logic'
import { Post } from './Post'

export function PostList({ targetUserId }) {
    const { alert } = useContext()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        loadPosts()
    }, [])

    const loadPosts = () => {
        try {
            (targetUserId ? logic.getUserPosts(targetUserId) : logic.getPosts())
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

    const handlePostDeleted = () => loadPosts()

    const handlePostDescriptionEdited = () => loadPosts()

    const handlePostLikeToggled = () => loadPosts()
    
    return <section className="posts-section">
        {posts.toReversed().map(post => <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} onPostDescriptionEdited={handlePostDescriptionEdited} onPostLikeToggled={handlePostLikeToggled}/>)}
    </section>
}
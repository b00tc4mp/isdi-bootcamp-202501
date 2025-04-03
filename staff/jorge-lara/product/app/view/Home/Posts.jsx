import { useState, useEffect } from 'react';

import { logic } from '../../logic/index.js';
import { Post } from './Post.jsx'

export function Posts({ targetUserId }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadPosts();
    }, [])

    const loadPosts = () => {
        try {
            debugger;
            (targetUserId ? logic.getUserPosts(targetUserId) : logic.getPosts())
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                })
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const handlePostLikeToggled = () => loadPosts();

    const handlePostDeleted = () => loadPosts();

    const handlePostTextEdited = () => loadPosts();

    return <section>
        {posts.map(post => <Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted} onPostTextEdited={handlePostTextEdited} />)}
    </section>
}
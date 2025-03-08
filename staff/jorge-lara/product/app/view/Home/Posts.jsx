import { useState, useEffect } from 'react';

import { logic } from '../../logic/index.js';
import { Post } from './Post.jsx'

export function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try {
            const posts = logic.getPosts();

            setPosts(posts);

        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }, [])

    const handlePostLikeToggled = () => {
        try {
            const posts = logic.getPosts();

            setPosts(posts);
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const handlePostDeleted = () => {
        try {
            const posts = logic.getPosts();

            setPosts(posts);
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const handlePostTextEdited = () => {
        try {
            const posts = logic.getPosts();

            setPosts(posts);
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <section>
        {posts.map(post => <Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted} onPostTextEdited={handlePostTextEdited} />)}
    </section>
}
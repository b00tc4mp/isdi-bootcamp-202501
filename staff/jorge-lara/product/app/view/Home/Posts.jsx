import { useState, useEffect } from 'react';

import { logic } from '../../logic/index.js';
import { Post } from './Post.jsx'
import { useContext } from '../../context.js';

export function Posts({ targetUserId }) {
    const { alert } = useContext();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadPosts();
    }, [targetUserId])

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

    return <section className='flex flex-col items-center m-auto'>
        {posts.map(post => <Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted} onPostTextEdited={handlePostTextEdited} />)}
    </section>
}
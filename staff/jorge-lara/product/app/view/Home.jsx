const { useState, useEffect } = React;

function Home({ onLogoutClick, onAddPostClick }) {
    const [view, setView] = useState('posts');
    const [username, setUserName] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try {
            const user = logic.getLoggedUser();
            const posts = logic.getPosts();

            setUserName(user);
            setPosts(posts);

        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }, [])

    const handleLogoutClick = () => {
        try {
            logic.logoutUser();

            onLogoutClick();
        } catch (error) {
            console.error(message);

            alert(error.message);
        }
    }

    const handleAddPostClick = () => onAddPostClick()

    const handleToggleLikePostClick = postId => {
        try {
            logic.toggleLikePost(postId);

            const posts = logic.getPosts();

            setPosts(posts);
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }
    return <div>
        <header>
            <h1>Home</h1>
            <h2>Current user: {username}</h2>

            <button type="button" onClick={handleLogoutClick}>Sign out</button>
        </header>

        <main>
            {view === 'posts' &&
                <section style={{ display: 'flex', flexDirection: 'column', width: '250px' }}>

                    {posts.map(post =>
                        <article>
                            <h3>{post.author}</h3>
                            <img src={post.image} />
                            <p>{post.text}</p>

                            <div className="post-footer">
                                <time>{post.createdAt.toISOString()}</time>
                                <button onClick={() => handleToggleLikePostClick(post.id)}>{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>
                            </div>
                        </article>)}
                </section>}
        </main>
        <footer>
            {view === 'posts' && <button className="floating-button" onClick={handleAddPostClick} type="button">+</button>}
        </footer>
    </div>
}
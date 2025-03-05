const { useState, useEffect } = React;

import Posts from './components/Posts.jsx'
import CreatePost from './components/CreatePost.jsx';

import logic from '../logic.js'

function Home({ onLogoutClick }) {
    const [view, setView] = useState('posts');
    const [username, setUserName] = useState('');

    useEffect(() => {
        try {
            const user = logic.getLoggedUser();

            setUserName(user);
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

    const handleAddPostClick = () => setView('create-post');

    const handleCancelPostSubmit = () => setView('posts');

    const handleCreatePostSubmit = () => setView('posts');

    return <div>
        <header>
            <h1>Home</h1>
            <h2>Current user: {username}</h2>

            <button type="button" onClick={handleLogoutClick}>Sign out</button>
        </header>

        <main>
            {view === 'posts' && <Posts />}

            {view === 'create-post' && <CreatePost onCancelClick={handleCancelPostSubmit} onAddPostSubmit={handleCreatePostSubmit} />}
        </main>
        <footer>
            {view === 'posts' && <button className="floating-button" onClick={handleAddPostClick} type="button">+</button>}
        </footer>
    </div>
}

export default Home;
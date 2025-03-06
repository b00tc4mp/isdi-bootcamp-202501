const { useState, useEffect } = React;

import Posts from './components/Posts.jsx'
import CreatePost from './components/CreatePost.jsx';

import logic from '../logic.js'

function Home({ onUserLoggedOut }) {
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

            onUserLoggedOut();
        } catch (error) {
            console.error(message);

            alert(error.message);
        }
    }

    const handleAddPostClick = () => setView('create-post');

    const handlePostCreated = () => setView('posts');

    const handlePostCreateCancelled = () => setView('posts');

    return <div>
        <header>
            <h1>Home</h1>
            <h2>Current user: {username}</h2>

            <button type="button" onClick={handleLogoutClick}>Sign out</button>
        </header>

        <main>
            {view === 'posts' && <Posts />}

            {view === 'create-post' && <CreatePost onPostCreateCancelled={handlePostCreateCancelled} onPostCreated={handlePostCreated} />}
        </main>
        <footer>
            {view === 'posts' && <button className="floating-button" onClick={handleAddPostClick}>+</button>}
        </footer>
    </div>
}

export default Home;
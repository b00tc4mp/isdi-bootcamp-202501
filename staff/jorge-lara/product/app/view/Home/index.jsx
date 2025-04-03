import { useState, useEffect } from 'react';

import { Posts } from './Posts.jsx';
import { CreatePost } from './CreatePost.jsx';
import { Profile } from './Profile.jsx';

import { logic } from '../../logic/index.js';
import { Routes, Route, useLocation, useNavigate } from 'react-router';
import { Search } from './Search.jsx';

export function Home({ onUserLoggedOut }) {
    const [username, setUsername] = useState('');

    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        try {
            logic.getUserUsername()
                .then(username => setUsername(username))
                .catch(error => {
                    console.error(error);

                    alert(error.message)
                })

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

    const handleAddPostClick = () => navigate('/create-post');

    const handlePostCreated = () => navigate('/');

    const handlePostCreateCancelled = () => navigate('/');

    const handleHomeClick = () => navigate('/');

    const handleUserClick = () => {
        try {
            debugger;
            const userId = logic.getUserId();

            navigate(`/${username}`, { state: { userId } });
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const handleSearchClick = () => navigate('/search');

    return <div className='Home'>
        <header>
            <h1 onClick={handleHomeClick}>Home</h1>
            <h2 onClick={handleUserClick}>{username}</h2>

            {pathname === '/' && <button onClick={handleSearchClick}>🔍</button>}

            <button type="button" onClick={handleLogoutClick}>Sign out</button>
        </header>

        <main>
            <Routes>
                <Route path="/create-post" element={<CreatePost onPostCreateCancelled={handlePostCreateCancelled} onPostCreated={handlePostCreated} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/:username" element={<Profile />} />
                <Route path='/' element={<Posts />} />
            </Routes>
        </main>
        <footer>
            {pathname === '/' && <button className="floating-button" onClick={handleAddPostClick}>+</button>}
        </footer>
    </div>
}
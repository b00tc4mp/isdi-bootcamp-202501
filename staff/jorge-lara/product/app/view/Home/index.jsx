import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router';
import { useContext } from '../../context';

import { Posts } from './Posts.jsx';
import { CreatePost } from './CreatePost.jsx';
import { Profile } from './Profile.jsx';
import { Search } from './Search.jsx';

import { logic } from '../../logic/index.js';

export function Home({ onUserLoggedOut }) {
    const { alert, confirm } = useContext();

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
        confirm('Logout?')
            .then(accepted => {
                if (accepted) {
                    try {
                        logic.logoutUser();

                        onUserLoggedOut();
                    } catch (error) {
                        console.error(message);

                        alert(error.message);
                    }
                }
            })

    }

    const handleAddPostClick = () => navigate('/create-post');

    const handlePostCreated = () => navigate('/');

    const handlePostCreateCancelled = () => navigate('/');

    const handleHomeClick = () => navigate('/');

    const handleSearchClick = () => navigate('/search');

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


    return <div className='Home'>
        <header>
            <h1 className='cursor-pointer' onClick={handleHomeClick}>Home</h1>
            <h2 className='cursor-pointer' onClick={handleUserClick}>{username}</h2>

            {pathname === '/' && <button className='cursor-pointer' onClick={handleSearchClick}>🔍</button>}

            <button className='cursor-pointer' type="button" onClick={handleLogoutClick}>Sign out</button>
        </header>

        <main className='my-12 mx-0'>
            <Routes>
                <Route path="/create-post" element={<CreatePost onPostCreateCancelled={handlePostCreateCancelled} onPostCreated={handlePostCreated} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/:username" element={<Profile />} />
                <Route path='/' element={<Posts />} />
            </Routes>
        </main>
        <footer className='relative p-[20px]'>
            {pathname === '/' && <button className='fixed bottom-5 right-5 bg-[#3498db] text-white border-0 rounded-full w-[60px] h-[60px] text-2xl cursor-pointer' onClick={handleAddPostClick}>+</button>}
        </footer>
    </div>
}
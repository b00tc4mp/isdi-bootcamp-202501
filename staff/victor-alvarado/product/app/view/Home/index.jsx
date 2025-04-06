import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { Posts } from './Posts.jsx'
import { CreatePost } from './CreatePost.jsx'
import { Profile } from './Profile.jsx'
import { Search } from './Search.jsx'

import { logic } from '../../logic/index.js'
import { useContext } from '../../context.js'

export function Home({ onUserLoggedOut }) {
    const { alert, confirm } = useContext()
    const [username, setUsername] = useState('')

    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            logic.getUserUsername()
                .then(username => setUsername(username))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onUserLoggedOut()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleAddPostClick = () => navigate('/create-post')

    const handlePostCreated = () => navigate('/')

    const handlePostCreateCancelled = () => navigate('/')

    const handleHomeClick = () => navigate('/')

    const handleSearchClick = () => navigate('/search')

    const handleUserClick = () => {
        try {
            const userId = logic.getUserId()

            navigate(`/${username}`, { state: { userId } })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Home -> render')

    return (
        <div className="min-h-screen bg-[url('/view/images/fondo.jpg')] bg-cover bg-center bg-no-repeat flex flex-col">
            <header className="flex justify-between items-center fixed top-0 w-full bg-transparent py-[var(--padding-y)] px-[var(--padding-x)] box-border z-50 relative">
                <img
                    src="https://elpingo.com/wp-content/uploads/2023/02/hombre-arana-logo-negro.png"
                    alt="Logo Araña"
                    className="w-20 h-20 cursor-pointer"
                    onClick={handleHomeClick}
                />

                {pathname === '/' && (
                    <button
                        onClick={handleSearchClick}
                        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 font-sans text-[1.2rem] bg-red-500 text-yellow-500 px-4 py-2 border-[3px] border-black rounded-[10px] cursor-pointer uppercase shadow-[5px_5px_0_yellow] hover:bg-yellow-500 hover:text-red-500 active:scale-[0.95] transition-all duration-200"
                        style={{ fontSize: '24px', zIndex: 100, border: '2px solid green' }} // Bordes para ver si se muestra
                    >
                        🔍
                    </button>
                )}

                <button type="button" onClick={handleLogoutClick}>Logout</button>
            </header>

            <main className="mt-[80px] flex-grow">
                <Routes>
                    <Route path="/create-post" element={<CreatePost onPostCreated={handlePostCreated} onPostCreateCancelled={handlePostCreateCancelled} />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/:username" element={<Profile />} />
                    <Route path="/" element={<Posts />} />
                </Routes>
            </main>

            <footer className="fixed bottom-4 w-full bg-transparent py-[var(--padding-y)] px-[var(--padding-x)] box-border flex justify-center z-50">
                {pathname === '/' && (
                    <button
                        onClick={handleAddPostClick}
                        className="bg-blue-500 text-white font-sans text-[1.5rem] px-4 py-2 rounded-full shadow-lg hover:bg-blue-400 active:scale-[0.95] transition-all duration-200"
                        style={{ zIndex: 100, border: '2px solid red' }} // Bordes para ver si se muestra
                    >
                        +
                    </button>
                )}
            </footer>
        </div>
    );
}

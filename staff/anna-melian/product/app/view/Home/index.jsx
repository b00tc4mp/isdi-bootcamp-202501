import { useState, useEffect } from 'react'

import { logic } from '../../logic/index.js'
import { Posts } from './Posts.jsx'
import { Profile } from './Profile.jsx'
import { CreatePost } from './CreatePost.jsx'
import { Settings } from './Settings.jsx'

export function Home({ onLogoutClick, onDeleteProfileClick }) {
    const [view, setView] = useState('posts')
    const [userName, setUserName] = useState('')


    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            const name = logic.getUserName()
            const house = logic.getUserHouse()

            document.body.className = ''
            document.body.classList.add(house)
            document.querySelector('h1').classList.add(`logo-${house}`)


            setUserName(name)

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
            document.body.className = ''

            onLogoutClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleAddPostClick = () => setView('create-post')

    const handleSettingsClick = () => setView('home-settings')


    const handleProfileCLick = () => setView('profile')


    const handlePostCreateSubmit = () => setView('posts')

    const handleSubmitChanges = () => setView('posts')

    const handleDeleteProfile = () => {
        document.body.className = ''
        onDeleteProfileClick()
    }

    const onBackHomeClick = () => {
        setView('posts')
    }


    console.debug('Home -> render')

    return <div>
        <header>
            <h1 className="logo-hogwarts"></h1>

            <h2>Hello, {userName}!</h2>

            <button type="button" onClick={handleLogoutClick}>Logout</button>

        </header>

        <main>

            {view === 'posts' && <Posts />}

            {view === 'create-post' && <CreatePost onPostCreateSubmit={handlePostCreateSubmit} />
            }

            {view === 'profile' && <Profile />}


            {view === 'home-settings' && <Settings onSubmitChanges={handleSubmitChanges} onDeleteProfileClick={handleDeleteProfile} />}

        </main>

        <footer>

            <button title="Home" onClick={onBackHomeClick} >🏰</button>
            <button title="Create a post" onClick={handleAddPostClick}>➕</button>
            <button title='Profile' onClick={handleProfileCLick}>🧙‍♀️</button>
            <button title="Settings" onClick={handleSettingsClick}>⚙️</button>

        </footer>
    </div>
}


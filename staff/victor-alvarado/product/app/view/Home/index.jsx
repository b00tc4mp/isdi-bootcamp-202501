import { useState, useEffect } from 'react'

import { Posts } from './Posts.jsx'
import { CreatePost } from './CreatePost.jsx'

import { logic } from '../../logic/index.js'

export function Home({ onUserLoggedOut }) {
    const [view, setView] = useState('posts')
    const [userName, setUserName] = useState('')

    useEffect(() => {
        console.debug('Home -> useEfect')

        try {
            logic.getUserName()
                .then(name => setUserName(name))
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
    const handleAddPostClick = () => setView('create-post')

    const handlePostCreated = () => setView('posts')

    const handlePostCreateCancelled = () => setView('posts')

    console.debug('Home -> render')

    return <div className="Home">
        <header>
            <h1>Logo</h1>

            <h2>Hello, {userName}!</h2>

            <button type="button" onClick={handleLogoutClick}>Logout</button>
        </header>

        <main>
            {view === 'posts' && <Posts />}
            {view === 'create-post' && <CreatePost onPostCreated={handlePostCreated} onPostCreateCancelled={handlePostCreateCancelled} />}

        </main>

        <footer>
            {view === 'posts' && <button onClick={handleAddPostClick}>+</button>}
        </footer>

    </div>
}

import { useState, useEffect } from 'react'

import { logic } from '../../logic/index.js'

import { Posts } from './components/Posts.jsx'
import { CreatePost } from './components/CreatePost.jsx'


export function Home({ onUserLoggedOut, onNavigateToProfile }) {
    const [view, setView] = useState('posts')
    const [userName, setUsername] = useState('')

    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            const name = logic.getUserName()

            setUsername(name)
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

    const handleCreatedPost = () => {
        try {
            setView('posts')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleNavigateToProfile = () => {
        onNavigateToProfile()
    }

    const handleCreatePostCanceled = () => {
        setView('posts')
    }

    console.debug('Home -> render')

    return <div className="posts">

        <section className="header">
            <h1>Logo</h1>
            <h3>Welcome, {userName}</h3>
            <button type="button" onClick={handleNavigateToProfile}>🤴🏻</button>
        </section>

        <main>
            {view === 'posts' && <Posts />}

            {view === 'addPost' && <CreatePost onCreatedPost={handleCreatedPost} onCreatePostCanceled={handleCreatePostCanceled} />}
        </main>

        <footer>
            <button onClick={handleLogoutClick}>Logout</button>
        </footer>

    </div >
}
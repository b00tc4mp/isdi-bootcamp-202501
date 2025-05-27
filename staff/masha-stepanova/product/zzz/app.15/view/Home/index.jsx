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
            logic.getUserName()
                .then(name => setUsername(name))
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

    const handleCreatedPost = () => setView('posts')

    const handleNavigateToProfile = () => onNavigateToProfile()

    const handleCreatePostCanceled = () => setView('posts')

    console.debug('Home -> render')

    return <div className="posts">

        <section className="header">
            <button onClick={handleLogoutClick}>Logout</button>

            <h1>Foodies</h1>

            <section className="profile-logout">
                <button type="button" onClick={handleNavigateToProfile}>🤴🏻</button>
            </section>

        </section>

        <main>
            {view === 'posts' && <Posts />}

            {view === 'addPost' && <CreatePost onCreatedPost={handleCreatedPost} onCreatePostCanceled={handleCreatePostCanceled} />}
        </main>

    </div >
}
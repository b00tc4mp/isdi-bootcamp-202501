// import { useState, useEffect } from 'react'
const { useState, useEffect } = React

import Posts from './components/Posts.jsx'
import CreatePost from './components/CreatePost.jsx'

import logic from '../logic.js'

function Home({ onLogoutClick }) {
    const [view, setView] = useState('posts')
    const [userName, setUserName] = useState('')

    useEffect(() => {
        console.debug('Index -> useEffect')

        try {
            const name = logic.getUserName()

            setUserName(name)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onLogoutClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleAddPostClick = () => setView('create-post')

    const handlePostCreateSubmit = () => setView('posts')

    console.debug('Index -> render')

    return <div>
        <header>
            <h1>Logo</h1>

            <h2>Hello, {userName}!</h2>

            <button type="button" onClick={handleLogoutClick}>Logout</button>
        </header>

        <main>
            {view === 'posts' && <Posts />}

            {view === 'create-post' && <CreatePost onPostCreateSubmit={handlePostCreateSubmit} />}
        </main>

        <footer>
            {view === 'posts' && <button onClick={handleAddPostClick}>+</button>}
        </footer>
    </div>
}

export default Home
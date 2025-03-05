const { useState, useEffect } = React

import logic from '../../logic.js'

import Posts from '../components/Posts.jsx'
import CreatePost from '../components/CreatePost.jsx'


function Home({ onLogoutClick, onProfileClick, onCancelClick }) {
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

            onLogoutClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleAddPostSubmit = () => {
        try {
            setView('addPost')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleProfileClick = () => {
        onProfileClick()
    }

    console.debug('Home -> render')

    return <div className="posts">

        <section className="header">
            <h1>Logo</h1>
            <h3>Welcome, {userName}</h3>
            <button type="button" onClick={handleProfileClick}>🤴🏻</button>
        </section>

        <main>
            {view === 'posts' && <Posts />}

            {view === 'addPost' && <CreatePost onAddPostSubmit={handleAddPostSubmit} />}
        </main>

        <footer>
            <button onClick={handleLogoutClick}>Logout</button>
        </footer>

    </div >
}

export default Home
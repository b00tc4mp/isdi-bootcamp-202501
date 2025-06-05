const { useState, useEffect } = React

import Posts from './components/Posts.jsx'
import CreatePost from './components/CreatePost.jsx'

import logic from '../logic.js'

function Homepage ({onReturnClick}) {
    const [view, setView] = useState('posts')
    const [userName, setUserName] = useState('')

    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            const name = logic.getUserName()

            setUserName(name)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])


    const handleCreatePostClick = () => setView('create-post')
    const handlePostCreateSubmit = () => setView('posts')

    console.debug('Home -> render')

    return <div>
        <header>
            <img src="doc\images\logo-bee-you.png" alt="Bee logo" className="bee-logo" />
            <h2>Hello, {userName}!</h2>

            <a onClick={onReturnClick}>Logout</a> 
        </header>

        <main>
            {view === 'posts' && <Posts />}
            {view === 'create-post' && <CreatePost onPostCreateSubmit={handlePostCreateSubmit}/>}
        </main>
        <footer>
            {view === 'posts' && <button onClick={handleCreatePostClick}>+ Create Post</button>
            }
        </footer>
    </div>
}

export default Homepage
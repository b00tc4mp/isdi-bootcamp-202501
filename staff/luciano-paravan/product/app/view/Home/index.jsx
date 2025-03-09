const { useState, useEffect } = React

import Posts from './Posts.jsx'
import CreatePost from './CreatePost.jsx'
//import CreatePost from './components/CreatePosts.jsx'

import logic from '../../logic.js'

function Home ({ onUserLoggedOut }) {
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
    },[])

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

    const handlePostTextEdited = () => setView('posts')

    return <div className='Home'>
        <header>
            <h1>Logo</h1>
            
            <h2>Hello, { userName }</h2>
            
            <button type="button" onClick={handleLogoutClick}>Log out</button>
        </header>
            <main>
                {view === 'posts' && <Posts />}
                
                {view === 'create-post' && <CreatePost onPostCreated={handlePostCreated} onPostCreateCancelled={handlePostCreateCancelled}/>}
            </main>

            <footer>
                {view === 'posts' && <button onClick={handleAddPostClick}>+</button>}
            </footer>
        </div>
}

export default Home
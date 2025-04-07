// HOME

const { useState, useEffect } = React

import Posts from "./components/Posts.jsx"
import CreatePost from "./components/CreatePosts.jsx"

import logic from "../logic.js"

function Home({ onLogoutClick }) {

    // View se utiliza para actualizar el estado de la pagina
    const [view, setView] = useState('posts')

    // SetUserName guarda el nombre del usuario que este conectado
    const [userName, setUserName] = useState('')

    // 
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

    // Cierra la sesion y actualiza la pagina
    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onLogoutClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    // 
    const handleAddPostClick = () => setView('create-post')

    // Despues de publicar
    const handleAfterPostsClick = () => setView('posts')

    // Cierra Create posts y muestra los posts
    const handleCancelClick = () => setView('posts')

    console.debug('Home -> render')

    return <div className="home">

        <header>
            <img src="./view/images/home.jpg" className="logoHome" />

            <h3 className="user">{userName}</h3>

            <button type="button" onClick={handleLogoutClick} className="logout">EXIT</button>
        </header>


        <main>
            {view === 'posts' && <Posts />}

            {view === 'create-post' && <CreatePost onPostCreateSubmit={handleAfterPostsClick}
                onCancelClick={handleCancelClick} />}
        </main>


        <footer className="footer">
            <img src="./view/images/NV.jpg" className="nvLogo" />

            {view === 'posts' && <button onClick={handleAddPostClick} className="new">NEW</button>}
        </footer>

    </div >
}

export default Home
const { useState, useEffect } = React
//importamos logica
import Posts from './components/Posts.jsx'
import CreatePost from './components/CreatePost.jsx'

import logic from '../logic.js'

function Home({ onLogoutClick }) {
    const[view, setView] = useState('posts')
    const[userName, setUserName] = useState('')

    // Funcion flecha para generar el saludo al entrar en home
    useEffect(() => {
        console.debug('Home -> useEffect')

        try{
            // lamamos a la logica de obtener el nombre y la guardamos en la variable name.
            const name = logic.getUserName()
            // llamamos a la logica para obtener los posts
            const posts = logic.getPosts()

            //llamamos a setUserName declarado en la línea 5 para cambiar el useState a la nueva variable name.
            setUserName(name)
            // lo mismo con posts
            setPosts(posts)

        }catch(error){
            console.error(error)

            alert(error.message)
        }
    }, [])

    // funcion para cuando le demos click a logout
    const handleLogoutClick = () => {
        try{
            logic.logoutUser()

            onLogoutClick()
        } catch(error) {
            console.error(error)

            alert(error.message)
        }
    }

    // Funcion cuando hagamos click en el boton de crear post.
    const handleAddPostClick = () => setView('create-post')

    // Funcion cuando hagamos submit en el form de create-post

   const handlePostCreateSubmit = () => setView('posts')
   

    console.debug('Home -> render')

    return <div>
        <header>
            <h1>HOME</h1>

            <h2>Hello, {userName}!</h2>

            <button type = "button" onClick={handleLogoutClick}>Logout</button>
        </header>
        
        <main>
            {view === 'posts' && <Posts />}

            {view === 'create-post' && <CreatePost onPostCreateSubmit = {handlePostCreateSubmit} />}
        </main>

    <footer>
        {view === 'posts' && <button onClick={handleAddPostClick}>ADD A POST !</button>}
    </footer>
    
    </div>     
}

// exportamos home
export default Home
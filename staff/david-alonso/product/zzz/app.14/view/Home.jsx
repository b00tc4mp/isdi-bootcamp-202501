// HOME

const { useState, useEffect } = React

function Home({ onLogoutClick }) {

    // View se utiliza para actualizar el estado de la pagina
    const [view, setView] = useState('posts')

    // SetUserName guarda el nombre del usuario que este conectado
    const [userName, setUserName] = useState('')

    // 
    const [posts, setPosts] = useState([])

    // Actualiza el nombre de usuario cuando se conecta
    useEffect(() => {
        console.debug('Home -> useEffect')

        try {

            // Obtiene el numbre del usuario conectado
            const name = logic.getUserName()

            // Obtiene los datos de los posts de Logig
            const posts = logic.getPosts()

            // Llamamos a la variable que contiene el nombre
            setUserName(name)

            // 
            setPosts(posts)
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

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { image: { value: image }, text: { value: text } } = form

            logic.createPost(image, text)

            const posts = logic.getPosts()

            setPosts(posts)
            setView('posts')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    // 
    const handleToggleLikePostClick = postId => {
        try {
            logic.toggleLikePost(postId)

            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    // Cierra Create posts y muestra los posts
    const handleCancelClick = () => setView('posts')

    console.debug('Home -> render')

    return <div >

        <header>
            <img src="./view/images/home.jpg" className="home" />

            <h3 className="hello">Hello, {userName} !</h3>
        </header>

        <button type="button" onClick={handleLogoutClick} className="logout">EXIT</button>

        <footer>
            {view === 'posts' && <button onClick={handleAddPostClick} className="new">NEW</button>}
        </footer>

        {view === 'posts' && <section>
            {posts.map(post =>
                <article>
                    <h3 className="userName">{post.userName}</h3>

                    <img src={post.image} />

                    <div className="data">
                        <p className="postText">{post.text}</p>

                        <button onClick={() => handleToggleLikePostClick(post.id)} className="like" >{`${post.liked ? '🧡' : '🤍'} (${post.likesCount})`} </button>
                    </div>
                    <time className="time">{post.createdAt.toLocaleString()}</time>

                </article>)}
            <div className="end"></div>
        </section>
        }

        {
            view === 'create-post' && <section>
                <div className="ddd">
                    <h1>NEW POST</h1>

                    <form onSubmit={handleCreatePostSubmit} >

                        <input type="url" id="image" placeholder=". 📷 Image" className="input" />

                        <input type="text" id="text" placeholder=". 🔤 Text" className="input" />

                        <button type="submit" >CREATE</button>
                    </form>
                </div>

                <div >
                    <a onClick={handleCancelClick} className="anchorCancel">CANCEL</a>
                </div>
            </section>
        }



    </div >
}

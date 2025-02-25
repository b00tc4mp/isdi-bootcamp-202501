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

    return <div>
        <h1>Home</h1>

        <h3>Hello, {userName}!</h3>

        <button type="button" onClick={handleLogoutClick} style={{ marginBottom: '10px' }}>Logout</button>

        {view === 'posts' && <button onClick={handleAddPostClick} style={{ margin: '30px' }}>NEW</button>}

        {view === 'posts' && <section>
            {posts.map(post =>
                <article>
                    <h3>{post.userName}</h3>

                    <img src={post.image} style={{ maxWidth: "600px" }} />

                    <button onClick={() => handleToggleLikePostClick(post.id)} style={{ backgroundColor: "rgb(71, 70, 70)" }} >{`${post.liked ? '🧡' : '🤍'} (${post.likesCount})`} </button>

                    <p style={{ color: 'white' }}>{post.text}</p>

                    <br />
                    <time style={{ color: 'white' }}>{post.createdAt.toLocaleString()}</time>

                </article>)}
        </section>
        }

        {
            view === 'create-post' && <section>

                <form onSubmit={handleCreatePostSubmit} style={{ display: 'inline-grid', color: 'white' }}>

                    <label htmlFor="image">Image</label>
                    <input type="url" id="image" />

                    <label htmlFor="text">Text</label>
                    <input type="text" id="text" />

                    <button type="submit" style={{ marginTop: '10px' }}>Create</button>
                </form>

                <div style={{ marginTop: '10px' }}>
                    <a onClick={handleCancelClick} style={{ textDecoration: 'underline' }}>Cancel</a>
                </div>
            </section>
        }



    </div >
}

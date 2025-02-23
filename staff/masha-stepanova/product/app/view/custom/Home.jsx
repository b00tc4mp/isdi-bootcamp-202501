const { useState, useEffect } = React

function Home({ onLogoutClick, onAddPostSubmit, onCancelClick }) {
    const [view, setView] = useState('posts')
    const [userName, setUsername] = useState('')
    const [posts, setPosts] = useState(logic.getPosts())
    const [postLiked, setPostLiked] = useState('')

    useEffect(() => {
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

    const handleAddPostClick = () => {
        try {
            setView('addPost')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancelClick = () => {
        try {
            onCancelClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleAddPostSubmit = (event) => {
        try {
            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            logic.addPost(image, text)

            setView('posts')

            onAddPostSubmit()

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    function printPosts() {
        try {
            // const posts = logic.getPosts()

            const postsToPrint = []

            for (let i = 0; i < posts.length; i++) {
                const likedByUser = logic.isPostLikedByUser(posts[i]) ? '❤️' : '🤍'

                postsToPrint.push(<article>
                    <h3>{posts[i].author}</h3>
                    <img src={posts[i].image} />
                    <p>{posts[i].text}</p>
                    <section>
                        {posts[i].likes.length}
                        <button>{likedByUser}</button>
                    </section>
                    <time>{posts[i].createdAt}</time>
                </article>)
            }

            return postsToPrint

        } catch (error) {
            console.error(error)

            alert(error.message)
        }


    }
    //poner like a un post, enviar data y pintarlo del color correspondiente

    const handleLikeClick = (currentPost) => {
        try {
            logic.isPostLikedByUser(currentPost)

            logic.likePost(currentPost)


        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <div
    // style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", gap: "0.3rem" }}>
    >
        <h1>Logo</h1>
        <h3>Welcome, {userName}</h3>
        {view === 'posts' && <section> {printPosts()}
            <footer style={{ display: "flex", position: "fixed", height: "40px", bottom: "0px", width: "100%", justifyContent: "space-around", alignItems: "center", backgroundColor: "white" }}>
                <button style={{ borderRadius: "50%" }} onClick={handleAddPostClick}>➕</button>
                <button onClick={handleLogoutClick}>Logout</button>
            </footer>
        </section>}

        {view === 'addPost' && <section style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", gap: "0.3rem" }}>
            <h1>Logo</h1>
            <p>To add new post you have to add the image link and a description to it. Try it now!</p>
            <form onSubmit={handleAddPostSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <label htmlFor="image">Add here a link to your image:</label>
                <input type="text" id="image" />
                <label htmlFor="text">Add here a little description:</label>
                <input type="text" id="text" />
                <button type="submit">Add post</button>
            </form>
            <a onClick={handleCancelClick}>Cancel</a>
        </section>}

    </div >
}
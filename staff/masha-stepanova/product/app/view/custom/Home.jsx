const { useState, useEffect } = React

function Home({ onLogoutClick, onAddPostSubmit, onCancelClick }) {
    const [view, setView] = useState('posts')
    const [userName, setUsername] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            const name = logic.getUserName()
            const posts = logic.getPosts()

            setUsername(name)
            setPosts(posts)
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
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            logic.addPost(image, text)

            const posts = logic.getPosts()

            setPosts(posts)
            setView('posts')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    // function printPosts() {
    //     try {
    //         const postsToPrint = []

    //         for (let i = posts.length - 1; i > - 1; i--) {
    //             // const likedBy = logic.isPostLikedByUser(posts[i]) ? '❤️' : '🤍'

    //             postsToPrint.push(<article>
    //                 <h3>{posts[i].author}</h3>
    //                 <img src={posts[i].image} />
    //                 <p>{posts[i].text}</p>
    //                 <section>
    //                     {posts[i].likes.length}
    //                     <button onClick={handleLikeClick(posts[i])}>{likedByUser}</button>
    //                 </section>
    //                 <time>{posts[i].createdAt}</time>
    //             </article>)
    //         }

    //         return postsToPrint

    //     } catch (error) {
    //         console.error(error)

    //         alert(error.message)
    //     }


    // }
    //poner like a un post, enviar data y pintarlo del color correspondiente

    const handleLikeClick = (postId) => {
        try {
            logic.likePost(postId)

            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <div
        style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", gap: "0.3rem" }}>
        {/* > */}
        <h1>Logo</h1>
        <h3>Welcome, {userName}</h3>
        {view === 'posts' && <section> {posts.map(post => <article>
            <h3>{post.author}</h3>

            <img src={post.image} />

            <p>{post.text}</p>

            <section>
                {/* {post.likes} */}
                <button onClick={() => handleLikeClick(post.id)}>{`${post.liked ? '❤️' : '🤍'} (${post.likesCount})`}</button>
            </section>

            <time>{post.createdAt}</time>
        </article>)}

            <footer style={{ display: "flex", position: "fixed", height: "40px", left: "0px", bottom: "0px", width: "100%", justifyContent: "space-around", alignItems: "center", backgroundColor: "white" }}>
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
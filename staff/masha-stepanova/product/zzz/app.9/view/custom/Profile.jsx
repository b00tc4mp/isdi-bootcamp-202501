import logic from '../../logic.js'

import Post from '../components/Post.jsx'

const { useState, useEffect } = React

function Profile({ onLogoutClick, onHomeClick }) {
    const [view, setView] = useState('profile')
    const [posts, setPosts] = useState([])

    const userName = logic.getUserName()

    useEffect(() => {
        try {
            const posts = logic.getUserPosts()

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

    const handlePostLikeToggled = (postId) => {
        try {
            const posts = logic.getUserPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostDeleted = () => {
        try {
            const posts = logic.getUserPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostTextEdited = () => {
        try {
            const posts = logic.getUserPosts()

            setPosts(posts)
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

    const handleAddPostSubmit = (event) => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            logic.addPost(image, text)

            const posts = logic.getUserPosts()

            setPosts(posts)
            setView('profile')
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

    const handleHomeClick = () => {
        try {
            onHomeClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <div class="posts">
        <section class="header">
            <h1>Logo</h1>
            <h3>{userName}</h3>
            <button onClick={handleLogoutClick}>Logout</button>
        </section>

        {view === 'profile' && <section> {
            posts.map(post => <Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted} onPostTextEdited={handlePostTextEdited} />)}
        </section>

        }

        < footer >
            <button onClick={handleHomeClick}>🏠</button>
            <button onClick={handleAddPostClick}>➕</button>
        </footer>

        {
            view === 'addPost' && <section >
                {/* style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", gap: "0.3rem" }}> */}
                <h1>Logo</h1>

                <p>To add new post you have to add the image link and a description to it. Try it now!</p>

                <form onSubmit={handleAddPostSubmit} >
                    {/* style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}> */}
                    <label htmlFor="image">Add here a link to your image:</label>
                    <input type="text" id="image" />

                    <label htmlFor="text">Add here a little description:</label>
                    <input type="text" id="text" />

                    <button type="submit">Add post</button>
                </form>
                <a onClick={handleCancelClick}>Cancel</a>
            </section>
        }


    </div >
}

export default Profile
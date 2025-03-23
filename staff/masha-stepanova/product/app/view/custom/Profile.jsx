import { logic } from '../../logic/index.js'

import { Post } from '../Home/components/Post.jsx'

import { useState, useEffect } from 'react'

export function Profile({ onUserLoggedOut, onNavigateToHome, onCreatePostCanceled }) {
    const [view, setView] = useState('profile')
    const [posts, setPosts] = useState([])
    const [userName, setUsername] = useState('')

    useEffect(() => {
        try {
            logic.getUserName()
                .then(name => {
                    setUsername(name)

                    logic.getUserPosts()
                        .then(posts => setPosts(posts))
                        .catch(error => {
                            console.error(error)

                            alert(error.message)
                        })
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleUserLoggedOut = () => {
        try {
            logic.logoutUser()
            onUserLoggedOut()

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostLikeToggled = (postId) => {
        try {
            logic.getUserPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostDeleted = () => {
        try {
            logic.getUserPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostTextEdited = () => {
        try {
            logic.getUserPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleAddPostClick = () => setView('addPost')

    const handleCreatePostSubmit = (event) => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            logic.createPost(image, text)
                .then(() => {
                    logic.getUserPosts()
                        .then(posts => setPosts(posts))
                        .catch(error => {
                            console.error(error)

                            alert(error.message)
                        })
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

            logic.getUserPosts()
                .then(posts => {
                    setPosts(posts)
                    setView('profile')
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCreatePostCancelClick = () => onCreatePostCanceled()

    const handleNavigateToHome = () => onNavigateToHome()


    return <div className="posts">
        <section className="header">
            <button onClick={handleUserLoggedOut}>Logout</button>
            <h1>Foodies</h1>
            <h3>{userName}</h3>

        </section>

        {view === 'profile' && <section> {
            posts.map(post => <Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted} onPostTextEdited={handlePostTextEdited} />)}
        </section>

        }

        < footer >
            <button onClick={handleNavigateToHome}>🏠</button>
            <button onClick={handleAddPostClick}>➕</button>
        </footer>

        {
            view === 'addPost' && <section >

                <p>To add new post you have to add the image link and a description to it. Try it now!</p>

                <form onSubmit={handleCreatePostSubmit} >

                    <label htmlFor="image">Add here a link to your image:</label>
                    <input type="text" id="image" />

                    <label htmlFor="text">Add here a little description:</label>
                    <input type="text" id="text" />

                    <button type="submit">Add post</button>
                </form>
                <a onClick={handleCreatePostCancelClick}>Cancel</a>
            </section>
        }


    </div >
}
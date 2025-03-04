const { useState, useEffect } = React

function Home({ onLogoutClick, onDeleteProfileClick }) {
    const [view, setView] = useState('posts')
    const [userName, setUserName] = useState('')
    const [posts, setPosts] = useState([])
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            const name = logic.getUserName()
            const posts = logic.getPosts()
            const house = logic.getUserHouse()

            document.body.className = ''
            document.body.classList.add(house)
            document.querySelector('h1').classList.add(`logo-${house}`)


            setUserName(name)
            setPosts(posts)

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])


    useEffect(() => {
        if (view === 'home-settings') {
            const { users, userId } = data
            const user = users.find(user => user.id === userId)

            if (user) {
                document.querySelector('#name').value = user.name
                document.querySelector('#username').value = user.username
                document.querySelector('#email').value = user.email

            }
        }
    }, [view])



    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
            document.body.className = ''

            onLogoutClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleAddPostClick = () => {
        setView('create-post')
    }
    const handleSettingsClick = () => {
        setView('home-settings')
    }

    const handleProfileCLick = () => {
        setView('home-profile')
    }

    const handleDeleteProfileClick = () => {
        const confirmation = confirm('This action is permanent, do you want to continue?')
        if (confirmation) {
            logic.deleteProfile()
            document.body.className = ''
            onDeleteProfileClick()
        } else {
            alert('Cancelled')
        }

    }




    const onBackHomeClick = () => {
        setView('posts')
    }


    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event
            const {
                img: { value: img },
                text: { value: text }
            } = form

            logic.createPost(img, text)
            const posts = logic.getPosts()

            setPosts(posts)
            setView('posts')


        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

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

    const handleUpdateProfileSubmit = event => {
        event.preventDefault()
        try {
            const { target: form } = event
            const {
                name: { value: name },
                username: { value: username },
                email: { value: email },

            } = form

            const updated = logic.updateUserProfile(name, username, email)

            if (!updated) {
                alert('No modifications')
            } else {
                setUserName(name)

                alert('Profile successfully updated 🧙‍♀️')

                setView('posts')
            }



        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleChangePasswordSubmit = event => {
        event.preventDefault()
        try {

            const { target: form } = event
            const {
                actualPassword: { value: actualPassword },
                newPassword: { value: newPassword },

            } = form

            logic.changePassword(actualPassword, newPassword)


            alert('Password successfully changed 🧙‍♀️')
            setView('posts')


        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }


    console.debug('Home -> render')

    return <div>
        <header>
            <h1 className="logo-gryffindor"></h1>

            <h2>Hello, {userName}!</h2>

            <button type="button" onClick={handleLogoutClick}>Logout</button>

        </header>

        <main>

            {view === 'posts' && <section>
                {posts.map(post =>
                    <article key={post.id}>

                        <h3>{logic.getAuthorUsername(post)}</h3>

                        <img src={post.image} />

                        <p>{post.text}</p>

                        <div className="post-footer">
                            <button onClick={() => handleToggleLikePostClick(post.id)}> {`${post.liked ? '❤️' : '🤍'} (${post.likesCount})`}</button>

                            <time style={{ display: 'block' }}>{new Date(post.createdAt).toLocaleDateString('es-ES')}</time>
                        </div>

                    </article>
                )}
            </section>}

            {view === 'create-post' && <section className="options">
                <h2>Create a new post</h2>
                <form onSubmit={handleCreatePostSubmit}>
                    <label htmlFor="image">Image</label>
                    <input id='img' type="url" />

                    <label htmlFor="text">Text</label>
                    <input id='text' type="text" />

                    <button type="submit">Create</button>
                </form>
            </section>}

            {view === 'home-profile' && (
                <section className="options">
                    <h2>My Profile</h2>

                    {(() => {
                        const { userId } = data
                        const userPosts = posts.filter(post => post.author === userId)

                        return userPosts.length > 0 ? (
                            userPosts.map(post => (
                                <article key={post.id}>
                                    <h3>{logic.getAuthorUsername(post)}</h3>

                                    <img src={post.image} alt="Post image" />

                                    <p>{post.text}</p>

                                    <div className="post-footer">
                                        <button onClick={() => handleToggleLikePostClick(post.id)}>
                                            {`${post.liked ? '❤️' : '🤍'} (${post.likesCount})`}
                                        </button>

                                        <time >
                                            {new Date(post.createdAt).toLocaleDateString('es-ES')}
                                        </time>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <h4 className="no-posts-message">You haven't created any post.</h4>

                        )
                    })()}
                </section>
            )}



            {view === 'home-settings' && <section className="options">
                <h2>Settings</h2>
                <h4>Change personal information</h4>
                <form onSubmit={handleUpdateProfileSubmit}>
                    <label htmlFor="text">Name</label>
                    <input id='name' type="text" />

                    <label htmlFor="text">Username</label>
                    <input id='username' type="text" />

                    <label htmlFor="text">E-mail</label>
                    <input id='email' type="email" />

                    <button type="submit">Update profile</button>
                </form>
                <h4>Change your password</h4>
                <form onSubmit={handleChangePasswordSubmit}>
                    <label htmlFor="text">Actual password</label>
                    <input type={showPassword ? 'text' : 'password'} id="actualPassword" />

                    <label htmlFor="text">New password</label>

                    <input type={showPassword ? 'text' : 'password'} id="newPassword" />
                    <button type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                    <button type="submit">Change password</button>

                </form>
                <h4>Delete your acount</h4>
                <button onClick={handleDeleteProfileClick}>Delete Profile</button>
            </section>}

        </main>

        <footer>

            <button title="Home" onClick={onBackHomeClick} >🏰</button>
            <button title="Create a post" onClick={handleAddPostClick}>➕</button>
            <button title='Profile' onClick={handleProfileCLick}>🧙‍♀️</button>
            <button title="Settings" onClick={handleSettingsClick}>⚙️</button>

        </footer>
    </div>
}

//TODO button in profile to delete a post


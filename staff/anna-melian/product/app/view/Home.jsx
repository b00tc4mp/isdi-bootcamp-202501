const { useState, useEffect } = React

function Home({ onLogoutClick }) {
    const [view, setView] = useState('posts')
    const [userName, setUserName] = useState('')
    // TODO add state for posts

    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            const name = logic.getUserName()

            setUserName(name)

            // TODO load posts by means of logic
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

    function Posts() {
        const posts = logic.getPosts()
        console.debug('Posts -> render')
        return (<section>
            {posts.map(post => (
                <article key={post.id}>
                    <h3>{logic.getAuthorUsername(post)}</h3>
                    <img src={post.image}
                        alt="Contenido del post"
                        width='500px' />
                    <p>{post.text}</p>
                    <button>🗨️</button>
                    <time>{new Date(post.createdAt).toISOString()}</time>
                    <button>♥️ ({post.likesCount})</button>
                </article>
            ))}
            <button onClick={onCreatePostClick}>+</button>
        </section>
        )


    }

    const onCommentsSectionClick = (post) => {
        return (<section>
            {post.map(comment => (<p>{comment}</p>))}


        </section>)
    }


    const onCreatePostClick = () => {
        console.debug('Create Post -> render')
        setView('create-post')
    }

    const onCancelCreatePostClick = () => {

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
            setView('posts')


        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    function CreatePost() {
        return <section>
            <form onSubmit={handleCreatePostSubmit}>
                <label>Image</label>
                <input id='img' type="url" />

                <label>Text</label>
                <input id='text' type="text" />

                <button type="submit">Create</button>
            </form>

            <a onClick={onCancelCreatePostClick}>Cancel</a>
        </section>
    }



    console.debug('Home -> render')

    return <div>
        <h1>Logo</h1>

        <h2>Hello, {userName}!</h2>

        <button type="button" onClick={handleLogoutClick}>Logout</button>



        {view === 'posts' && <Posts />}


        {view === 'create-post' && <CreatePost />}
    </div>
}
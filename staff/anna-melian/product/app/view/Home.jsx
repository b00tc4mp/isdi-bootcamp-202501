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

    console.debug('Home -> render')

    return <div>
        <h1>Logo</h1>

        <h2>Hello, {userName}!</h2>

        <button type="button" onClick={handleLogoutClick}>Logout</button>

        {view === 'posts' && <section>
            {/* TODO render posts from state */}

            <article>
                <h3>GryffindorSeeker</h3>

                <img src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGxvbWxuNWZlYm1qa3UzM3J0ZXRpNTRwdHZ0OHQ1amxvaHc5YmRheSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mz1kJeDVueKC4/giphy.gif' />

                <p>Buying my first wand</p>

                <time>2025-02-09T23:00:00.000Z</time>

                <button>♥️ (1)</button>
            </article>

            <article>
                <h3>theSmartestWitch</h3>

                <img src='https://media.giphy.com/media/IWvuFVQICQIr6/giphy.gif?cid=790b76118lomln5febmjku33rteti54ptvt8t5jlohw9bday&ep=v1_gifs_search&rid=giphy.gif&ct=g' />

                <p>It's leviosa, not leviosaar</p>

                <time>2024-12-31T23:00:00.000Z</time>

                <button>♥️ (2)</button>
            </article>
        </section>}

        {view === 'create-post' && <section>
            <form>
                <label>Image</label>
                <input type="url" />

                <label>Text</label>
                <input type="text" />

                <button type="submit">Create</button>
            </form>

            <a>Cancel</a>
        </section>}

        {view === 'posts' && <button>+</button>}
    </div>
}
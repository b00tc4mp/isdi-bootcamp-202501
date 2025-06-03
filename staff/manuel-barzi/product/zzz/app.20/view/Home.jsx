const { useState, useEffect } = React

function Home({ onLogoutClick }) {
    const [view, setView] = useState('posts')
    const [userName, setUserName] = useState('')
    // TODO add state for posts

    useEffect(() => {
        console.debug('Index -> useEffect')

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

    console.debug('Index -> render')

    return <div>
        <h1>Logo</h1>

        <h2>Hello, {userName}!</h2>

        <button type="button" onClick={handleLogoutClick}>Logout</button>

        {view === 'posts' && <section>
            {/* TODO render posts from state */}

            <article>
                <h3>m71tml17ly</h3>

                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2Z4OHhjZGdkbnl2d3Ayb20zaTB0cTgzYWg2Z3Y3YTl3eTB3bG44MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/11NU4BxIpTYNGw/giphy.gif" />

                <p>eclipsed with...</p>

                <time>2025-02-09T23:00:00.000Z</time>

                <button>♥️ (1)</button>
            </article>

            <article>
                <h3>m71tm7l3l5l</h3>

                <img src="https://media.giphy.com/media/o39U5VHcfNWhXb5JAd/giphy.gif?cid=790b7611xf982xikkmim43z9oppnx9x6qrsdnxsp1w8s9g3t&amp;ep=v1_gifs_search&amp;rid=giphy.gif&amp;ct=g" />

                <p>am i alive?</p>

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
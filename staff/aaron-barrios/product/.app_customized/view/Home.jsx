const { useState, useEffect } = React

function Home({ onLogoutClick }) {
    const [view, setView] = useState('posts')
    const [username, setUsername] = useState('')

    useEffect(() => {
        try {
            const username = logic.getUsername()

            setUsername(username)

            //TO DO LOAD POSTS
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

    return <div>
        <header style={{ width: "100%", height: "50px", margin: "10px", display: "flex", justifyContent: "space-between", alignItems: " center" }}>
            <h2>Welcome, {username}</h2>

            <button onClick={handleLogoutClick} style={{ width: "100px", height: "35px", marginRight: "10px" }} >Logout</button>
        </header >

        {view === 'posts' && <main>
            <section>
                <article style={{ width: "100%", padding: "10px", border: "1px solid rgb(204, 204, 204)", borderRadius: "5px", backgroundColor: " rgb(249, 249, 249)" }}>
                    <h3>m71tm7l3l5l</h3>
                    <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczQxY2Jlb25xNWN3bWo4MWR6dmM4cTR3Y3RqYjBqOThmYWJpNTIyayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0IpXwyCXikRK9Yl2/giphy.gif" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
                    <p>orange</p>
                    <time>2024-07-21T22:00:00.000Z</time>
                    <button>🤍 (0)</button>
                </article>

                <article style={{ width: "100%", padding: "10px", border: "1px solid rgb(204, 204, 204)", borderRadius: "5px", backgroundColor: " rgb(249, 249, 249)" }}>
                    <h3>m71tm7l3l5l</h3>
                    <img src="https://media.giphy.com/media/vSbW8dAA1n516fYcbm/giphy.gif?cid=790b7611hu0cl161xv6ry8v3y8k3q20kfgm39htr8lqds3wt&amp;ep=v1_gifs_search&amp;rid=giphy.gif&amp;ct=g" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
                    <p>aguacate</p>
                    <time>2024-01-09T23:00:00.000Z</time><button>🤍 (0)</button>
                </article>
            </section>
        </main>}

        {view === 'create-post' && <section>
            <h2>Create Post</h2>

            <form style={{ display: "flex", flexDirection: "column", justifyContent: "left", gap: "5px" }}>
                <label htmlFor="image">Image</label>
                <input type="text" id="image" style={{ width: "350px" }} />
                <label htmlFor="text">Text</label>
                <input type="url" id="text" style={{ width: "350px" }} />

                <button type="submit" style={{ width: "80px" }}>Create</button>
            </form>

            <a>Cancel</a>
        </section>}

        {view === 'posts' && <button>🧉</button>}
    </div >
}
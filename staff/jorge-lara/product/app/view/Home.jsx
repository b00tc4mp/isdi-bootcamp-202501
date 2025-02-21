function Home() {
    const handleLogoutClick = () => {
        root.render(<Landing />)
    }

    return <div>
        <h1>Home</h1>
        <h2>Current user: admin!</h2>
        <button onClick={handleLogoutClick}>Sign out</button>
        <button>+</button>
        <section style={{display: 'flex', flexDirection: 'column', width: '250px'}}>
            <article>
                <h3>m71tml17ly</h3>
                <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" />
                <p>eclipsed with...</p>
                <time>2025-02-09T23:00:00.000Z</time>
                <button>🤍 (0)</button>
            </article>
            <article>
                <h3>m71tm7l3l5l</h3>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg" />
                <p>am i alive?</p>
                <time>2024-12-31T23:00:00.000Z</time><button>🤍 (0)</button>
            </article>
        </section>
    </div>
}
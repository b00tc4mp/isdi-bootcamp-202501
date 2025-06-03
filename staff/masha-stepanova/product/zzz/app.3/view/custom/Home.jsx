function Home(LikePost) {
    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", gap: "0.3rem" }}>
        <h1>Logo</h1>
        <h3>Welcome, Rapunzel!</h3>
        <section>
            <article>
                <h3>rapunzel</h3>
                <img src="https://i.pinimg.com/736x/42/85/aa/4285aa2ae57fd188c9f9509fce0f5b36.jpg" />
                <p>Finally could see those ligths...</p>
                <section>
                    <text>0</text>
                    <button onClick={LikePost}>🤍</button>
                </section>
                <time>9/2/2025</time>
            </article>
            <article>
                <h3>belle</h3>
                <img src="https://upload.wikimedia.org/wikipedia/en/c/c0/Belle%27s_ball_gown_1991.jpg" />
                <p>My beautifull new dress</p>
                <section>
                    <text>0</text>
                    <button>🤍</button></section>
                <time>10/2/2025</time>
            </article>
        </section>
        <footer style={{ display: "flex", position: "fixed", height: "40px", bottom: "0px", width: "100%", justifyContent: "space-around", alignItems: "center", backgroundColor: "white" }}>
            <button style={{ borderRadius: "50%" }}>➕</button>
            <button>Logout</button>
        </footer>
    </div >
}
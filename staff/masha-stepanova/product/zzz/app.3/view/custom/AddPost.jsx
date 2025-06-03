function AddPost() {
    return <section style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", gap: "0.3rem" }}>
        <h1>Logo</h1>
        <p>To add new post you have to add the image link and a description to it. Try it now!</p>
        <form style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label>Add here a link to your image:</label>
            <input type="text" />
            <label>Add here a little description:</label>
            <input type="text" />
            <button type="submit">Add post</button>
        </form>
        <a>Cancel</a>
    </section>
}
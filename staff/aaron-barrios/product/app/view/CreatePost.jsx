function CreatePost() {
    return <div style={{ width: "400px" }}>
        <h2>Create Post</h2>

        <form style={{ display: "flex", flexDirection: "column", justifyContent: "left", gap: "5px" }}>
            <label>Image</label>
            <input type="text" style={{ width: "350px" }} />
            <label>Text</label>
            <input type="password" style={{ width: "350px" }} />
            <button type="submit" style={{ width: "80px" }}>Create</button>
        </form>
    </div>
}
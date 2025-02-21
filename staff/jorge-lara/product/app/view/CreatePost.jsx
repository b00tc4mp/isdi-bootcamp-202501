function CreatePost() {
    const handleClickCancel = ()  =>{
        root.render(<Home />)
    }

    return <div>
        <h1>Create a post</h1>
        <form style={{ display: 'flex', flexDirection: 'column', width: '250px' }}>
            <label>Title</label>
            <input type="text" />
            <label>Enter image url</label>
            <input type="url" />
            <span>
                <a style={{ cursor: 'pointer' }} onClick={handleClickCancel}>Cancel</a>
                <button type="submit" style={{ marginLeft: '50px' }}>Post</button>
            </span>
        </form>
    </div>

}
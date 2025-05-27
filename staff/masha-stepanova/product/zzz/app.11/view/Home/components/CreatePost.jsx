import { logic } from '../../../logic/index'

export function CreatePost({ onCreatedPost, onCreatePostCanceled }) {

    const handleCancelClick = () => {
        try {
            onCreatePostCanceled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCreatedPost = (event) => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            logic.addPost(image, text)

            onCreatedPost()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <section >

        <h1>Logo</h1>

        <p>To add new post you have to add the image link and a description to it. Try it now!</p>

        <form onSubmit={handleCreatedPost} >

            <label htmlFor="image">Add here a link to your image:</label>
            <input type="text" id="image" />

            <label htmlFor="text">Add here a little description:</label>
            <input type="text" id="text" />

            <button type="submit">Add post</button>
        </form>
        <a onClick={handleCancelClick}>Cancel</a>
    </section>
}
import { logic } from "../../logic"

export function CreatePost({ onPostCreateSubmit }) {

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event
            const {
                img: { value: img },
                text: { value: text }
            } = form

            logic.createPost(img, text)

            onPostCreateSubmit()


        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }


    return <section className="options">
        <h2>Create a new post</h2>
        <form onSubmit={handleCreatePostSubmit}>
            <label htmlFor="image">Image</label>
            <input id='img' type="url" />

            <label htmlFor="text">Text</label>
            <input id='text' type="text" />

            <button type="submit">Create</button>
        </form>
    </section>
}


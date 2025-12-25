import { logic } from '../../logic/index.js'
import { useContext } from '../../context.js'

export function CreatePost({ onPostCreated, onPostCreateCancelled }) {
    const { alert } = useContext()

    const handleFormSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const { image: { value: image }, text: { value: text } } = form

            logic.createPost(image, text)
                .then(() => onPostCreated())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancelClick = () => onPostCreateCancelled()

    console.debug('CreatePost -> render')

    return (
        <section>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="image">Image</label>
                <input type="url" id="image" />

                <label htmlFor="text">Text</label>
                <input type="text" id="text" />

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={handleCancelClick}
                        className="font-sans text-[1.2rem] bg-red-500 text-yellow-500 px-4 py-2 border-[3px] border-black rounded-[10px] cursor-pointer uppercase shadow-[5px_5px_0_black] hover:bg-yellow-500 hover:text-red-500 active:scale-[0.95] transition-all duration-200"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="font-sans text-[1.2rem] bg-red-500 text-yellow-500 px-4 py-2 border-[3px] border-black rounded-[10px] cursor-pointer uppercase shadow-[5px_5px_0_black] shadow-[10px_10px_0_yellow] hover:bg-yellow-500 hover:text-red-500 active:scale-[0.95] transition-all duration-200"
                    >
                        Create
                    </button>
                </div>
            </form>
        </section>
    );



}


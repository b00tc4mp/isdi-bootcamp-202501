import { logic } from '../../logic'
import { useContext } from '../../context'

export function CreateRecipe({ onRecipeCreated, onRecipeCreateCancelled }) {
    const { alert } = useContext()

    const handleFormSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const image = form.image?.value || ''
            const title = form.title?.value || ''
            const description = form.description?.value || ''
            const cookingTime = form.cookingTime?.value || ''

            if (!image || !title || !description || !cookingTime) {
                alert('Please fill in all the fields.')
                return
            }

            const parsedCookingTime = Number(cookingTime)

            logic.createRecipe(image, title, description, parsedCookingTime)
                .then(() => onRecipeCreated())
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleCancelClick = () => onRecipeCreateCancelled()

    console.debug('CreateRecipe -> render')

    return (
        <section>
            <form onSubmit={handleFormSubmit}>
                <div className="field">
                    <label htmlFor="image">Image URL</label>
                    <input type="url" id="image" name="image" />
                </div>

                <div className="field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" />
                </div>

                <div className="field">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" />
                </div>

                <div className="field">
                    <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                    <input type="number" id="cookingTime" name="cookingTime" />
                </div>

                <div className="buttons">
                    <button className="secondary" type="button" onClick={handleCancelClick}>
                        Cancel
                    </button>
                    <button type="submit">Create</button>
                </div>
            </form>
        </section>
    )
}

import { useContext } from '../../context.js';
import { logic } from '../../logic/index.js';

export function CreatePost({ onPostCreateCancelled, onPostCreated }) {
    const { alert } = useContext();
    const handleAddSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event

            const { image: { value: image }, text: { value: text } } = form

            logic.addPost(text, image)
                .then(() => onPostCreated())
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                })

        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    return <div className='flex flex-col items-center justify-center text-center min-h-screen w-full' >
        <h1>Create a post</h1>
        <form onSubmit={handleAddSubmit}>
            <div className='flex flex-col w-full mb-[1rem] border border-white'>
                <input type="text" id="text" placeholder="Type a description" />
            </div>
            <div className='flex flex-col w-full mb-[1rem] border border-white'>
                <input type="url" id="image" placeholder="Enter an url" />
            </div>
            <span className='flex justify-between'>
                <a onClick={onPostCreateCancelled}>Cancel</a>
                <button type="submit">Post</button>
            </span>
        </form>
    </div>

}
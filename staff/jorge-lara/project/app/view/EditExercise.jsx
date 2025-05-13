import { useContext } from '../context.js';
import { logic } from '../logic/index.js';

export function EditExercise({ exercise, onExerciseUpdated, onExerciseEditCancelled }) {
    const { alert } = useContext();

    const handleFormSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event;

            const updateFields = {
                name: form.name.value,
                muscleCategory: form.muscleCategory.value,
                description: form.description.value,
                instructions: form.instructions.value,
                sets: Number(form.sets.value),
                reps: Number(form.reps.value),
                restTime: Number(form.restTime.value),
                images: form.images.value ? [form.images.value] : [],
                videos: form.videos.value ? [form.videos.value] : []
            }

            logic.updateExercise(exercise.id, updateFields)
                .then(() => onExerciseUpdated())
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                })
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const handleCancelClick = () => onExerciseEditCancelled()

    return <section className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mx-auto'>
        <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">
            Edit Exercise
        </h2>
        <form className='grid grid-cols-1 md:grid-cols-2 gap-4' onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" defaultValue={exercise.name} required />
            </div>
            <div>
                <label htmlFor="muscleCategory">Muscle Category</label>
                <input type="text" id="muscleCategory" defaultValue={exercise.muscleCategory} required />
            </div>
            <div>
                <label htmlFor="description">Descritpion</label>
                <textarea id="description" defaultValue={exercise.description} rows={2} />
            </div>
            <div>
                <label htmlFor="instructions">Instructions</label>
                <textarea type="text" id="instructions" defaultValue={exercise.instructions} rows={2} />
            </div>
            <div>
                <label htmlFor="sets">Sets</label>
                <input type="text" id="sets" defaultValue={exercise.sets} required />
            </div>
            <div>
                <label htmlFor="reps">Reps</label>
                <input type="text" id="reps" defaultValue={exercise.reps} required />
            </div>
            <div>
                <label htmlFor="restTime"> Rest time (s)</label>
                <input type="text" id="restTime" defaultValue={exercise.restTime} required />
            </div>
            <div>
                <label htmlFor="images">Image Url</label>
                <input type="text" id="images" defaultValue={exercise.images} />
            </div>
            <div>
                <label htmlFor="videos">Video url</label>
                <input id="videos" defaultValue={exercise.videos} />
            </div>
            <div className='md:col-span-2 flex justify-between space-x-4 pt-4'>
                <button type='button' onClick={handleCancelClick} className='cursor-pointer bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 text-white transition-colors'>Cancel</button>
                <button type="submit" className='cursor-pointer bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 text-white transition-colors'>Submit</button>
            </div>
        </form>
    </section>
}
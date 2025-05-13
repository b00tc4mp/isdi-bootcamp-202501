import { useContext } from '../context.js';
import { logic } from '../logic/index.js';

export function CreateExercise({ onExerciseCreate, onExerciseCreateCancelled }) {
    const { alert } = useContext();

    const handleCancelClick = () => onExerciseCreateCancelled()

    const handleFormSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event;

            const { name: { value: name },
                muscleCategory: { value: muscleCategory },
                sets: { value: setsString },
                reps: { value: repsString },
                restTime: { value: restTimeString }
            } = form

            const sets = Number(setsString);
            const reps = Number(repsString);
            const restTime = Number(restTimeString);

            logic.createExercise(name, muscleCategory, sets, reps, restTime)
                .then(() => onExerciseCreate())
                .catch(error => {
                    console.error(error)

                    alert(error.message);
                })
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    return <section className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mx-auto'>
        <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">
            New Exercise
        </h2>
        <form className='flex flex-col space-y-4' onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" />
            </div>
            <div>
                <label htmlFor="muscleCategory">Muscle Category</label>
                <input type="text" id="muscleCategory" />
            </div>
            <div>
                <label htmlFor="sets">Sets</label>
                <input type="text" id="sets" />
            </div>
            <div>
                <label htmlFor="reps">Reps</label>
                <input type="text" id="reps" />
            </div>
            <div>
                <label htmlFor="restTime"> Rest time (s)</label>
                <input type="text" id="restTime" />
            </div>
            <div className='flex justify-between space-x-4 pt-4'>
                <button onClick={handleCancelClick} className=' cursor-pointer bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 text-white transition-colors'>Cancel</button>
                <button type="submit" className='cursor-pointer bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 text-white transition-colors'>Submit</button>
            </div>
        </form>
    </section>
}
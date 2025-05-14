import { useEffect, useState } from "react";
import { logic } from '../logic/index.js';
import { useContext } from "../context.js";

export function CreateRoutine({ onRoutineCreate, onRoutineCreateCancelled }) {
    const { alert } = useContext();
    const [exercisesList, setExercisesList] = useState([])

    useEffect(() => {
        loadExercises()
    }, [])

    const loadExercises = () => {
        try {
            logic.getExercises()
                .then(exercises => setExercisesList(exercises))
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                })
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const handleFormSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event;

            const {
                title: { value: title },
                description: { value: description },
                duration: { value: durationString },
                difficulty: { value: difficulty },
                category: { value: category },
                type: { value: type },
                exercises: { selectedOptions },
                startDate: { value: startDate },
                endDate: { value: endDate }
            } = form;

            const duration = Number(durationString);
            const exercises = Array.from(selectedOptions).map(opt => opt.value)

            logic.createRoutine(title, description, duration, difficulty, category, type, exercises, startDate, endDate)
                .then(() => onRoutineCreate())
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                })
        } catch (error) {
            console.error(error);

            alert(error.message);
        }

    }

    const handleCancelClick = () => onRoutineCreateCancelled();

    return <section className='w-full max-w-2xl h-[90vh] mx-auto max-h-[100vh] overflow-y-auto bg-white rounded-2xl shadow-lg p-8'>
        <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">
            New Routine
        </h2>
        <form className='flex flex-col space-y-4' onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" required />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" rows={2} />
            </div>
            <div>
                <label htmlFor="duration">Duration (mins)</label>
                <input type="number" id="duration" min={1} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="difficulty">Difficulty</label>
                    <input type="text" id="difficulty" />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" required />
                </div>
            </div>
            <div>
                <label htmlFor="type">Type</label>
                <input type="text" id="type" placeholder="e.g. Circuit" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="startDate">Start Date</label>
                    <input type="date" id="startDate" required />
                </div>
                <div>
                    <label htmlFor="endDate">End Date</label>
                    <input type="date" id="endDate" required />
                </div>
            </div>
            <div>
                <label htmlFor="exercises">Exercises</label>
                <select id="exercises" multiple required >{exercisesList.map((ex => (<option key={ex.id} value={ex.id}>{ex.name}</option>)))}</select>

            </div>
            <div className='flex justify-between space-x-4 pt-4'>
                <button onClick={handleCancelClick} className='cursor-pointer bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 text-white transition-colors'>Cancel</button>
                <button type="submit" className='cursor-pointer bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 text-white transition-colors'>Submit</button>
            </div>
        </form>
    </section>
}
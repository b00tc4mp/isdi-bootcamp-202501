import { useEffect, useState } from "react";
import { logic } from '../logic/index.js';
import { useContext } from "../context.js";

export function EditRoutine({ routine, onRoutineEditCancelled, onRoutineUpdated }) {
    const { alert } = useContext();
    const [exercisesList, setExercisesList] = useState([])
    const [selectedExercises, setSelectedExercises] = useState(
        (routine.exercises || []).map(ex => (typeof ex === 'string' ? ex : ex._id)));

    useEffect(() => {
        loadExercises();
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

    const handleSelectChange = (event) => {
        const values = Array.from(event.target.selectedOptions).map(opt => opt.value);
        setSelectedExercises(values);
    }

    const handleFormSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event;

            const updateFields = {
                title: form.title.value,
                description: form.description.value,
                duration: Number(form.duration.value),
                difficulty: form.difficulty.value,
                category: form.category.value,
                type: form.type.value,
                startDate: form.startDate.value,
                endDate: form.endDate.value,
                exercises: selectedExercises,
            };

            logic.updateRoutine(routine.id, updateFields)
                .then(() => onRoutineUpdated())
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                })
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const handleCancelClick = () => onRoutineEditCancelled()

    return <section className="w-full max-w-2xl h-[90vh] mx-auto max-h-[100vh] overflow-y-auto bg-white rounded-2xl shadow-lg p-8 ">
        <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">
            Edit Routine
        </h2>
        <form onSubmit={handleFormSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>

            <div className="md:col-span-2">
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' defaultValue={routine.title} required />
            </div>

            <div className="md:col-span-2">
                <label htmlFor='description'>Description</label>
                <textarea id='description' defaultValue={routine.description} rows={2} />
            </div>

            <div>
                <label htmlFor="duration">Duration (mins)</label>
                <input type="number" id="duration" min={1} defaultValue={routine.duration} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                <div>
                    <label htmlFor="difficulty">Difficulty</label>
                    <input type="text" id="difficulty" defaultValue={routine.difficulty} required />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" defaultValue={routine.category} required />
                </div>
            </div>

            <div>
                <label htmlFor="type">Type</label>
                <input type="text" id="type" defaultValue={routine.type} placeholder="e.g. Circuit" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                <div>
                    <label htmlFor="startDate">Start Date</label>
                    <input type="date" id="startDate" defaultValue={routine.startDate?.split('T')[0]} required />
                </div>
                <div>
                    <label htmlFor="endDate">End Date</label>
                    <input type="date" id="endDate" defaultValue={routine.endDate?.split('T')[0]} required />
                </div>
            </div>
            <div>
                <label htmlFor="exercises">Exercises</label>
                <select id="exercises" multiple value={selectedExercises} onChange={handleSelectChange} required >
                    {exercisesList.map((ex => (<option key={ex.id} value={ex.id}>{ex.name}</option>)))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                    Hold down Ctrl to select multiple exercises
                </p>
            </div>

            <div className='md:col-span-2 flex justify-between space-x-4 pt-4'>
                <button type='button' onClick={handleCancelClick} className='cursor-pointer bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 text-white transition-colors'>Cancel</button>
                <button type="submit" className='cursor-pointer bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 text-white transition-colors'>Submit</button>
            </div>
        </form>
    </section>
}
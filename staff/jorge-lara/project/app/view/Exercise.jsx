import { useState } from 'react';
import { logic } from '../logic/index.js';
import { Modal } from '../components/index.js';
import { EditExercise } from './EditExercise.jsx';
import { useContext } from '../context.js';

export function Exercise({ exercise, onExerciseDeleted, onExerciseUpdated }) {
    const { alert, confirm } = useContext();
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        confirm('Delete exercise?')
            .then(accepted => {
                if (accepted) {
                    try {
                        logic.deleteExercise(exercise.id)
                            .then(() => onExerciseDeleted())
                            .catch(error => {
                                console.error(error);

                                alert(error.message);
                            });
                    } catch (error) {
                        console.error(error);

                        alert(error.message);
                    }
                }
            })
    }

    const handleExerciseUpdated = () => {
        setShowModal(false);
        onExerciseUpdated();
    }

    return <div className="flex flex-col bg-white rounded-2xl shadow-lg p-6 md:flex-row md:w-[70%] md:space-x-8 mx-auto px-4 py-6 mt-6 space-y-6">
        <div className="md:w-1/3 flex-shrink-0">
            <div className='cursor-pointer overflow-hidden rounded-lg h-48 md:h-auto'>
                {exercise.images?.length > 0 ? (
                    <img src={exercise.images[0]} className="w-full h-full rounded-lg object-cover" />
                ) : (<div className="flex items-center justify-center w-full h-48 bg-gray-200 rounded-lg text-gray-500">
                    No media
                </div>)}
            </div>

        </div>
        <div className="flex flex-col md:w-2/3 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
                {exercise.name}
            </h2>
            <span className="text-sm font-medium inline-block text-orange-500">
                {exercise.muscleCategory}
            </span>

            {exercise.description && (
                <p className="text-gray-700">{exercise.description}</p>
            )}

            {exercise.instructions && (
                <div>
                    <h3 className="text-lg font-medium text-gray-800">Instructions</h3>
                    <p className="text-gray-700">{exercise.instructions}</p>
                </div>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <span><strong>Weight:</strong> {exercise.weight} kg</span>
                <span><strong>Sets:</strong> {exercise.sets}</span>
                <span><strong>Reps:</strong> {exercise.reps}</span>
                <span><strong>Rest:</strong> {exercise.restTime} s</span>
            </div>

            {exercise.videos?.length > 0 && (
                <div>
                    <h3 className='text-lg font-medium text-gray-800'>Video</h3>
                    <a href={exercise.videos[0]} target='_blank'>{exercise.videos[0]}</a>
                </div>
            )}

            <div className=" flex justify-end mt-4 space-x-4 ">
                <button onClick={() => setShowModal(true)} className="cursor-pointer px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">Edit</button>
                <button onClick={handleDeleteClick} className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">Delete</button>
            </div>
        </div>

        {showModal && (
            <Modal>
                <EditExercise exercise={exercise} onExerciseUpdated={handleExerciseUpdated} onExerciseEditCancelled={() => setShowModal(false)} />
            </Modal>)}
    </div>
}
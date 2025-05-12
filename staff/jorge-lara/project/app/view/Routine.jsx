import { useState } from "react";
import { RoutineCalendar } from "../components/index.js"
import { logic } from '../logic/index.js';
import { EditRoutine } from "./EditRoutine.jsx";
import { Modal } from '../components/index.js';

export function Routine({ routine, onRoutineDeleted, onRoutineUpdated, showButtons = true }) {
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        try {
            logic.deleteRoutine(routine.id)
                .then(() => onRoutineDeleted())
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error);
        }
    }

    const handleRoutineUpdated = () => {
        setShowModal(false);
        onRoutineUpdated();
    }

    return <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-xl text-center font-bold text-gray-800 mb-5">{routine.title}</h2>
        <div className="flex flex-col md:flex-row md:space-x-8">

            <div className="w-full md:w-[300px] mb-4 md:mb-0">
                <RoutineCalendar key={`${routine.startDate}-${routine.endDate}`} startDate={routine.startDate} endDate={routine.endDate} />
            </div>

            <div className="flex-1 flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
                <div className="flex-1 space-y-2">
                    <div className="border border-gray-300 rounded-lg bg-gray-50 p-4">
                        {routine.description ? (
                            <p className="text-gray-600">{routine.description}</p>
                        ) : (
                            <p className="text-gray-400 italic text-lg">No description</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 text-base text-gray-700 ">
                        <p className="mb-2">
                            <strong>Duration:</strong> {routine.duration} mins</p>
                        <p className="mb-2">
                            <strong>Difficulty:</strong> {routine.difficulty}</p>
                        <p className="mb-2">
                            <strong>Category:</strong> {routine.category}</p>
                        <p className="mb-2">
                            <strong>Type:</strong> {routine.type}</p>
                    </div>

                </div>

                <div className="flex-1">
                    <h3 className="text-orange-500 font-semibold mb-2">Exercises:</h3>
                    <ul className="list-disc list-inside text-gray-700 text-base">
                        {routine.exercises.map((exercise, index) => (
                            <li key={index}>{exercise.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        {showButtons && (<div className="flex justify-end mt-4 space-x-4">
            <button
                onClick={() => setShowModal(true)}
                className="cursor-pointer px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Edit
            </button>
            <button
                onClick={handleDeleteClick}
                className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Delete
            </button>
        </div>)}

        {showModal && (
            <Modal>
                <EditRoutine routine={routine} onRoutineUpdated={handleRoutineUpdated} onRoutineEditCancelled={() => setShowModal(false)} />
            </Modal>
        )}
    </div>

}
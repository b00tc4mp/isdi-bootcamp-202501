import { useEffect, useState } from "react"
import { logic } from '../logic/index.js';
import { Exercise } from './Exercise.jsx';
import { Modal } from '../components/index.js';
import { CreateExercise } from './CreateExercise.jsx';
import { useContext } from "../context.js";

export function Exercises({ }) {
    const { alert } = useContext();
    const [exercises, setExercises] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadExercises();
    }, [])

    const loadExercises = () => {
        try {
            logic.getExercises()
                .then(exercises => setExercises(exercises))
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                });

        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const handleExerciseCreated = () => {
        setShowModal(false);
        loadExercises();
    }

    const handleExerciseDeleted = () => loadExercises();

    const handleExerciseUpdated = () => {
        setShowModal(false);
        loadExercises();
    };

    return <section className="flex flex-col items-center mx-auto ">

        {exercises.length === 0 ? (
            <div className="text-center  mt-12">
                <p className="text-lg">No exercises found</p>
                <p className="text-sm mt-2">Click the <span className="font-semibold text-orange-500">+</span> button to create your first exercise!</p>
            </div>
        ) : (
            exercises.map(exercise => (
                <Exercise
                    key={exercise.id}
                    exercise={exercise}
                    onExerciseDeleted={handleExerciseDeleted}
                    onExerciseUpdated={handleExerciseUpdated}
                />
            ))
        )}
        {showModal && (
            <Modal>
                <CreateExercise onExerciseCreate={handleExerciseCreated} onExerciseCreateCancelled={() => setShowModal(false)}></CreateExercise>
            </Modal>
        )}

        <button onClick={() => setShowModal(true)} className=" flex items-center justify-center fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-orange-500 hover:bg-orange-600 text-white text-2xl sm:text-3xl border-0 rounded-full cursor-pointer">+</button>

    </section>
}
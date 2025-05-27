import { useEffect, useState } from "react";
import { logic } from '../logic/index.js';
import { Routine } from "./Routine.jsx";
import { Modal } from '../components/index.js';
import { CreateRoutine } from "./CreateRoutine.jsx";
import { useContext } from "../context.js";

export function Routines() {
    const { alert } = useContext();
    const [routines, setRoutines] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadRoutines();
    }, [])

    const loadRoutines = () => {
        try {
            logic.getRoutines()
                .then(routines => setRoutines(routines))
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                });
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const handleRoutineCreated = () => {
        setShowModal(false);
        loadRoutines();
    }

    const handleRoutineDeleted = () => loadRoutines();

    const handleRoutineUpdated = () => {
        setShowModal(false);
        loadRoutines();
    }

    return <section className="flex flex-col items-center mx-auto">

        {routines.length === 0 ? (
            <div className="text-center mt-12">
                <p className="text-lg">No routines created yet</p>
                <p className="text-sm mt-2">
                    Tap the <span className="font-semibold text-orange-500">+</span> to create your first routine!
                </p>
            </div>
        ) : (
            routines.map(routine => (
                <Routine
                    key={routine.id}
                    routine={routine}
                    onRoutineDeleted={handleRoutineDeleted}
                    onRoutineUpdated={handleRoutineUpdated}
                />
            ))
        )}

        {showModal && (
            <Modal>
                <CreateRoutine onRoutineCreate={handleRoutineCreated} onRoutineCreateCancelled={() => setShowModal(false)} />
            </Modal>
        )}

        <button onClick={() => setShowModal(true)} className=" flex items-center justify-center fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-orange-500 hover:bg-orange-600 text-white text-2xl sm:text-3xl border-0 rounded-full cursor-pointer">+</button>
    </section>
}
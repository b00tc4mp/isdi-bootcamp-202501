import { useEffect, useState } from "react";
import { logic } from '../logic/index.js';
import { Routine } from "./Routine.jsx";
import { Modal } from '../components/index.js';
import { CreateRoutine } from "./CreateRoutine.jsx";

export function Routines() {
    const [routines, setRoutines] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadRoutines();
    }, [])

    const loadRoutines = () => {
        try {
            logic.getRoutines()
                .then(routines => setRoutines(routines))
                .catch(error => console.error(error));
        } catch (error) {
            console.error(error);
        }
    }

    const handleRoutineCreated = () => {
        setShowModal(false);
        loadRoutines();
    }

    const handleRoutineDeleted = () => loadRoutines();

    return <section className="flex flex-col items-center mx-auto">

        {routines.map(routine => <Routine key={routine.id} routine={routine} onRoutineDeleted={handleRoutineDeleted} />)}

        {showModal && (
            <Modal>
                <CreateRoutine onRoutineCreate={handleRoutineCreated} onRoutineCreateCancelled={() => setShowModal(false)} />
            </Modal>
        )}

        <button onClick={() => setShowModal(true)} className=" flex items-center justify-center fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-orange-500 hover:bg-orange-600 text-white text-2xl sm:text-3xl border-0 rounded-full cursor-pointer">+</button>
    </section>
}
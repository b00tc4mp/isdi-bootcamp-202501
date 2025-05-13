import { useEffect, useState } from "react";
import { logic } from "../../logic"
import { Routine } from "../Routine.jsx"
import { useContext } from "../../context.js";

export function Dashboard() {
    const { alert } = useContext();
    const [currentRoutines, setCurrentRoutines] = useState([]);
    const [nextRoutine, setNextRoutine] = useState(null);
    const [pastRoutine, setPastRoutine] = useState(null);

    useEffect(() => {
        loadCurrentRoutines();
        loadNextRoutine();
        loadPastRoutine();
    }, [])

    const loadCurrentRoutines = () => {
        try {
            logic.getCurrentRoutines()
                .then(routines => setCurrentRoutines(routines))
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                })
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const loadPastRoutine = () => {
        try {
            logic.getPastRoutine()
                .then(routines => setPastRoutine(routines))
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                })
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const loadNextRoutine = () => {
        try {
            logic.getNextRoutine()
                .then(routines => setNextRoutine(routines))
                .catch(error => {
                    console.error(error);

                    alert(error.message);
                })
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    return (
        <div className="w-full max-w-5xl mx-auto py-8 space-y-12">
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Current Routines
                </h2>
                {currentRoutines.length > 0 ? (
                    currentRoutines.map(routine => (
                        <Routine key={routine.id} routine={routine} showButtons={false} />
                    ))
                ) : (
                    <p className="text-center text-gray-600">No current routines.</p>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Next routine
                </h2>
                {nextRoutine ? (
                    <Routine routine={nextRoutine} showButtons={false} />
                ) : (
                    <p className="text-center text-gray-600">No upcoming routines.</p>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Last completed routine
                </h2>
                {pastRoutine ? (
                    <Routine routine={pastRoutine} showButtons={false} />
                ) : (
                    <p className="text-center text-gray-600">No completed routines.</p>
                )}
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import { logic } from "../../logic"
import { Routine } from "../Routine.jsx"
import { parseISO, isAfter, isBefore, compareAsc, compareDesc, isWithinInterval } from 'date-fns';

export function Dashboard() {
    //const [routines, setRoutines] = useState([]);
    const [currentRoutines, setCurrentRoutines] = useState([]);
    const [nextRoutine, setNextRoutine] = useState(null);
    const [pastRoutine, setPastRoutine] = useState(null);
    useEffect(() => {
        //loadRoutines();
        loadCurrentRoutines();
        loadNextRoutine();
        loadPastRoutine();
    }, [])

    // const loadRoutines = () => {
    //     try {
    //         logic.getRoutines()
    //             .then(routines => setRoutines(routines))
    //             .catch(error => console.error(error))
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const loadCurrentRoutines = () => {
        try {
            logic.getCurrentRoutines()
                .then(routines => setCurrentRoutines(routines))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error);
        }
    }

    const loadPastRoutine = () => {
        try {
            logic.getPastRoutine()
                .then(routines => setPastRoutine(routines))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error);
        }
    }

    const loadNextRoutine = () => {
        try {
            logic.getNextRoutine()
                .then(routines => setNextRoutine(routines))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error);
        }
    }
    // useEffect(() => {
    //     if (routines.length === 0) return;

    //     const now = new Date();

    //     const current = routines
    //         .filter(r => r.startDate && r.endDate)
    //         .map(r => ({ ...r, start: parseISO(r.startDate), end: parseISO(r.endDate) }))
    //         .filter(r => isWithinInterval(now, { start: r.start, end: r.end }));
    //     setCurrentRoutines(current);

    //     const upcoming = routines
    //         .filter(r => r.startDate)
    //         .map(r => ({ ...r, start: parseISO(r.startDate) }))
    //         .filter(r => isAfter(r.start, now));

    //     if (upcoming.length > 0) {
    //         upcoming.sort((a, b) => compareAsc(a.start, b.start));
    //         setNextRoutine(upcoming[0]);
    //     }

    //     const completed = routines
    //         .filter(r => r.endDate)
    //         .map(r => ({ ...r, end: parseISO(r.endDate) }))
    //         .filter(r => isBefore(r.end, now));

    //     if (completed.length > 0) {
    //         completed.sort((a, b) => compareDesc(a.end, b.end));
    //         setPastRoutine(completed[0]);
    //     }
    // }, [routines])

    return (
        <div className="w-full max-w-5xl mx-auto py-8 space-y-12">
            {/* Rutinas actuales */}
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

            {/* Próxima rutina */}
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

            {/* Última rutina completada */}
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
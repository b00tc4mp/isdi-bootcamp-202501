import { useEffect, useState } from "react";
import { logic } from "../../logic"

export function Dashboard() {
    const [routines, setRoutines] = useState([]);


    useEffect(() => {
        loadRoutines()
    }, [])

    const loadRoutines = () => {
        try {
            logic.getRoutines()
                .then(routines => setRoutines(routines))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error);
        }
    }

    return <div>
        <div>
            <h2>Next Routine</h2>
        </div>
        <div>
            <h2>Last Routine</h2>
        </div>
    </div>
}
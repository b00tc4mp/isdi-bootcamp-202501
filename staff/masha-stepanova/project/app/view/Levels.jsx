import { useEffect, useState } from 'react'
import { Level } from './Level'
import { logic } from '../logic'

export function Levels() {
    const [levels, setLevels] = useState([])

    useEffect(() => {
        try {
            logic.getLevels()
                .then(levels => setLevels(levels))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])


    return <div className="overflow-auto height-200px bg-yellow" >
        {levels.map(level => <Level key={level.id} level={level} />)}
    </div >
}
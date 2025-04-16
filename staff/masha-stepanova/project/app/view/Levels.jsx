import { useEffect, useState } from 'react'
import { Level } from './Level'
import { logic } from '../logic'

export function Levels({ onLevelSelected }) {
    const [levels, setLevels] = useState([])

    useEffect(() => {
        logic.getLevels()
            .then(setLevels)
            .catch(console.error)
    }, [])

    return (
        <div className="grid gap-4 max-h-[400px] overflow-y-auto py-2">
            {levels.map(level => (
                <div key={level.id} onClick={() => onLevelSelected(level)} className="cursor-pointer">
                    <Level level={level} clickable />
                </div>
            ))}
        </div>
    )
}

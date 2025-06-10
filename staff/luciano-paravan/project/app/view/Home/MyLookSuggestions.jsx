import { useEffect, useState } from 'react'
import { logic } from '../../logic/index.js'
import { useContext } from '../../context.js'

export function MyLookSuggestions() {
    const { alert } = useContext()
    const [savedLooks, setSavedLooks] = useState([])

useEffect(()=> {
    try {
        logic.getSavedLooks()
        .then(setSavedLooks)
        .catch(error => {
            console.error(error)
            alert(error.message)
        })
    } catch (error) {
        console.error(error)
        alert(error.message)
    }
}, [])

    return (
        <div className="flex flex-col py-20 px-4">
            <h2 className="text-2xl mb-4">My Saved Looks</h2>

            {savedLooks.length === 0 && <p className="text-[var(--text-color)]">No saved looks yet.</p>}

            {savedLooks.map((suggestion, index) => (
                <div key={index} className="py-4 border-b border-[var(--second-color)]">
                    <h4 className="text-xl font-semibold text-[var(--text-color)] mb-2">Look {index + 1}</h4>
                    {["top", "bottom", "shoes", "accessory"].map(category => {
                        const item = suggestion.look.find(item => item.category === category)
                        return item ? (
                            <div key={category}>
                                <strong className="font-semibold text-[var(--third-color)]">{category.toUpperCase()}: </strong>
                                {item.itemName} ({item.source})
                            </div>
                        ) : null
                    })}
                    <p className="text-sm mt-2 italic text-[var(--text-color)]">{suggestion.notes}</p>
                </div>
            ))}
        </div>
    )
}
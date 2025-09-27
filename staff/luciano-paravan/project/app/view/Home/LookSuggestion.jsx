import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { logic } from '../../logic/index.js'
import { useContext } from '../../context.js'

export function LookSuggestion() {
    const location = useLocation()
    const navigate = useNavigate()
    const { suggestions, formData, requestId } = location.state || {}
    const { alert } = useContext()

    useEffect(() => {
        console.log('LookSuggestion mounted')
        if(!suggestions && !formData) {
            navigate('/look-request')
        }
    }, [suggestions, formData, navigate])

    if (!suggestions) return null

    const handleNewSuggestions = () => {
        console.log('New suggestions requested')
        try {
            logic.lookRequest(formData.contextOccasion, formData.location, formData.temperature, formData.timeOfDay, formData.style, formData.additionalDetails, formData.allowExternalItemSuggestions)
                .then(({suggestions: newSuggestions, requestId: newRequestId}) => {
                    navigate('/look-suggestion', { state: { suggestions: newSuggestions, formData, requestId: newRequestId }})
            })
            .catch(error => {
                console.error(error)
                alert(error.message)
            })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleSaveLook = (suggestion) => {
        const { look, notes } = suggestion

        try {
            if (!requestId) {
                alert('Missing request ID. Please try generating a new look first.')
                return
            }
            
            logic.saveLookSuggestion(requestId, look, notes)
                .then(() => alert('Look saved successfully'))
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    return (
        <div className="flex flex-col py-22">
            <h2 className="text-2xl">Look Suggestion</h2>

            {suggestions.map((suggestion, index) => (
                <div key={index} className="py-4 border-b">
                    <h4 className="text-xl font-semibold text-[var(--text-color)] mb-2">Look {index + 1}</h4>
                    {["top", "bottom", "shoes", "accessory"].map(category => {
                        const item = suggestion.look.find(clothingItem => clothingItem.category === category)
                        return item ? (
                            <div key={category}>
                                <strong className="font-semibold text-[var(--third-color)] mr-2 md:mr-0 md:mb-1">{category.toUpperCase()}: </strong> {item.itemName} ({item.source})
                            </div>
                        ) : null
                    })}
                    <div className="flex justify-end mt-2">
                        <button onClick={() => handleSaveLook(suggestion)} className="px-3 rounded-md bg-[var(--third-color)] text-[var(--bg-color)]  text-sm gap-1">Save</button>
                    </div>
                </div>
            ))}

            <button onClick={handleNewSuggestions} className="btn-primary my-4">New suggestions</button>
    </div>
    )
}

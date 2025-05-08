import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { logic } from '../../logic/index.js'

export function LookSuggestion() {
    const location = useLocation()
    const navigate = useNavigate()
    const suggestions = location.state?.suggestions
    const formData = location.state?.formData

    useEffect(() => {
        if(!suggestions && !formData) {
            navigate('/look-request')
        }
    }, [suggestions, formData, navigate])

    if (!suggestions) return null

    const handleNewSuggestions = () => {
        try {
            return logic.lookRequest(formData.contextOccasion, formData.location, formData.temperature, formData.timeOfDay, formData.style, formData.additionalDetails, formData.allowExternalItemSuggestions)
            .then(newSuggestions => {
                navigate('/look-suggestion', { state: { suggestions: newSuggestions, formData }})
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

    return (
        <div className="flex flex-col py-22">
            <h2>Look Suggestion</h2>

            {suggestions.map((suggestion, index) => (
                <div key={index} className="py-4 border-b">
                    <h4>Look {index + 1}</h4>
                    {["top", "bottom", "shoes", "accesory"].map(category => {
                        const item = suggestion.look.find(clothingItem => clothingItem.category === category)
                        return item ? (
                            <div key={category}>
                                <strong>{category.toUpperCase()}: </strong> {item.itemName} ({item.source})
                            </div>
                        ) : null
                    })}
                </div>
            ))}

            <button onClick={handleNewSuggestions} className="btn-primary my-4">New suggestions</button>
    </div>
    )
}

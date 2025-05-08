import { useContext, useState } from 'react'
import { logic } from '../../logic/index.js'
import { useNavigate } from 'react-router'

export function LookRequest() {
    const [contextOccasion, setContextOccasion] = useState([])
    const [location, setLocation] = useState('')
    const [temperature, setTemperature] = useState('')
    const [timeOfDay, setTimeOfDay] = useState('')
    const [style, setStyle] = useState('')
    const [additionalDetails, setAdditionalDetails] = useState('')
    const [allowExternalItemSuggestions, setAllowExternalItemSuggestions] = useState(false)

    const { alert, confirm } = useContext()

    const navigate = useNavigate()

    const handleContextOccasionChange = event => {
        const value = event.target.value
        setContextOccasion(prev => prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value])
    }

    const handleSubmit = event => {
        event.preventDefault()
        
        const formData = {
            contextOccasion, location, temperature, timeOfDay, style, additionalDetails, allowExternalItemSuggestions
        }

        try {
            return logic.lookRequest(contextOccasion, location, temperature, timeOfDay, style, additionalDetails, allowExternalItemSuggestions)

                .then(suggestions => {
                    navigate('/look-suggestion', { state: { suggestions, formData }})
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

    return <div className="flex flex-col py-20">
        <h2 className="pl-4">Look Request</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
            
            <fieldset className="flex flex-col gap-2 md:gap-3">
                <legend className="text-[var(--first-color)] mb-2">Context Occasion</legend>
                {['formal', 'casual', 'sport', 'party'].map(contextOption => (
                    <label key={contextOption} className="flex items-center gap-2 text-[var(--text-color)]">
                        <input 
                            type="checkbox" 
                            value={contextOption}
                            checked={contextOccasion.includes(contextOption)}
                            onChange={handleContextOccasionChange}
                        />
                        {contextOption}
                    </label>
                ))}
            </fieldset>
            
            <label className="text-[var(--first-color)]">
                Location
                <select className="text-[var(--text-color)]" value={location} onChange={event => setLocation(event.target.value)} required>
                    <option value="">Select Location</option>
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                </select>
            </label>
            
            <label className="text-[var(--first-color)]">
                Temperature
                <select className="text-[var(--text-color)]" value={temperature} onChange={event => setTemperature(event.target.value)} required>
                    <option value="">Select Temperature</option>
                    <option value="cold">Cold</option>
                    <option value="warm">Warm</option>
                    <option value="neutral">Neutral</option>
                </select>
            </label>

            <label className="text-[var(--first-color)]">
                Time of the day
                <select className="text-[var(--text-color)]" value={timeOfDay} onChange={event => setTimeOfDay(event.target.value)} required>
                    <option value="">Select Time of the day</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                </select>
            </label>
            
            <label className="text-[var(--first-color)]">
                Style
                <select className="text-[var(--text-color)]" value={style} onChange={event => setStyle(event.target.value)} required>
                    <option value="">Select Style</option>
                    <option value="classic">Classic</option>
                    <option value="trendy">Trendy</option>
                    <option value="minimalist">Minimalist</option>
                    <option value="colorful">Colorful</option>
                </select>
            </label>

            <label className="text-[var(--first-color)]">
                Additional details
                <select className="text-[var(--text-color)]" value={additionalDetails} onChange={event => setAdditionalDetails(event.target.value)}>
                    <option value="">Select additional details</option>
                    <option value="date">Date</option>
                    <option value="business">Business</option>
                    <option value="rain">Rain</option>
                </select>
            </label>

            <label className="text-[var(--first-color)] flex gap-x-2">
                <input
                    type="checkbox"
                    checked={allowExternalItemSuggestions}
                    onChange={event => setAllowExternalItemSuggestions(event.target.checked)}
                />
                Allow external item suggestions
            </label>

            <button type="submit" className="btn-primary">Request Look</button>
        </form>
    </div>
}
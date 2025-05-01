import { useState, useEffect } from 'react'

export function RequestLook () {
    const [contextOccasion, setContextOccasion] = useState([])
    const [location, setLocation] = useState('')
    const [temperature, setTemperature] = useState('')
    const [timeOfDay, setTimeOfDay] = useState('')
    const [style, setStyle] = useState('')
    const [additionalDetails, setAdditionalDetails] = useState('')
    const [allowExternalItemSuggestion, setAllowExternalItemSuggestion] = useState(false)

    const handleContextOccasionChange = event => {
        const value = event.target.value
        setContextOccasion(prev => prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value])
    }

    const handleRequesLookSubmit = event => {
        event.preventDefault()
        //TODO
    }

    return <div>
        <form onSubmit={handleRequesLookSubmit} className="flex flex-col py-22">
            
            <fieldset className="flex flex-col">
                <legend>Context Occasion</legend>
                {['formal', 'casual', 'sport', 'party'].map(contextOption => (
                    <label key={contextOption}>
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
            
            <label>
                Location:
                <select value={location} onChange={event => setLocation(event.target.value)} required>
                    <option value="">Select Location</option>
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                </select>
            </label>
            
            <label>
                Temperature:
                <select value={temperature} onChange={event => setTemperature(event.target.value)} required>
                    <option value="">Select Temperature</option>
                    <option value="cold">Cold</option>
                    <option value="warm">Warm</option>
                    <option value="neutral">Neutral</option>
                </select>
            </label>

            <label>
                Time of the day:
                <select value={timeOfDay} onChange={event => setTimeOfDay(event.target.value)} required>
                    <option value="">Select Time of the day</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                </select>
            </label>
            
            <label>
                <select value={style} onChange={event => setStyle(event.target.value)} required>
                    <option value="">Select Style</option>
                    <option value="classic">Classic</option>
                    <option value="trendy">Trendy</option>
                    <option value="minimalist">Minimalist</option>
                    <option value="colorful">Colorful</option>
                </select>
            </label>

            <label>
                Additional details:
                <select value={additionalDetails} onChange={event => setAdditionalDetails(event.target.value)}>
                    <option value="">Select additional details</option>
                    <option value="date">Date</option>
                    <option value="business">Business</option>
                    <option value="rain">Rain</option>
                </select>
            </label>

            <label>
                <input 
                    type="checkbox"
                    checked={allowExternalItemSuggestion}
                    onChange={event => setAllowExternalItemSuggestion(event.target.checked)}
                />
                Allow external item suggestions
            </label>

            <button type="submit" className="btn-primary">Request Look</button>
        </form>
    </div>
}
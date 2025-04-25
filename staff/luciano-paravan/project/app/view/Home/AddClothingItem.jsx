import { Routes, Route, useNavigate } from 'react-router-dom'

import { logic } from '../../logic/index.js'
import { useState } from 'react'
import { SystemError, ValidationError } from 'com/errors'

export function AddClothingItem({ onAddedClothingItem }) {
    const [itemName, setItemName] = useState('')
    const [category, setCategory] = useState('')
    const [type, setType] = useState('')
    const [color, setColor] = useState('')
    const [season, setSeason] = useState([])
    const [occasion, setOccasion] = useState([])

    const handleSubmit = event => {
        event.preventDefault()

        try {
            logic.addClothingItem(itemName, category, type, color, season, occasion)
            .then(() => {
                setItemName('')
                setCategory('')
                setType('')
                setColor('')
                setSeason([])
                setOccasion([])

                onAddedClothingItem()
            })
            .catch(error => {
                console.error(error)

                if(error instanceof SystemError)
                    alert('⛔️' + error.message)
                else
                    alert('⚠️' + error.message)
            })
        } catch (error) {
            console.error(error)

            if(error instanceof ValidationError)
                alert('❗️' + error.message)
            else
                alert('⛔️' + error.message)
        }
    }

    const handleSeasonChange = event => {
        const value = event.target.value
        setSeason(prev => prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value])
    }

    const handleOccasionChange = event => {
        const value = event.target.value
        setOccasion(prev => prev.includes(value) ? prev.filter(o => o !== value) : [...prev, value])
    }

    return <div className="flex flex-col py-14">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
            <label>
                Item name:
                <input type="text" value={itemName} onChange={event => setItemName(event.target.value)} required/>
            </label>

            <label>
                Category:
                <select type="text" value={category} onChange={event => setCategory(event.target.value)} required >
                    <option value="">Select Category</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="shoes">Shoes</option>
                    <option value="accessory">Accessory</option>
                </select>
            </label>            

            <label>
                Type:
                <input type="text" value={type} onChange={event => setType(event.target.value)} placeholder="e.g., t-shirt, jeans, sneakers" required />
            </label>

            <label>
                Color:
                <input type="text" value={color} onChange={event => setColor(event.target.value)} required />
            </label>

            <fieldset className="flex flex-col">
                <legend>Season</legend>
                {['summer', 'winter', 'spring', 'autumn'].map(seasonOption => (
                    <label key={seasonOption}>
                        <input 
                            type="checkbox"
                            value={seasonOption}
                            checked={season.includes(seasonOption)}
                            onChange={handleSeasonChange}  
                        />
                        {seasonOption}
                    </label>
                ))}
            </fieldset>

            <fieldset className="flex flex-col">
                <legend>Occasion</legend>
                {['formal', 'casual', 'sport', 'party'].map(occasionOption => (
                    <label key={occasionOption}>
                        <input
                            type="checkbox"
                            value={occasionOption}
                            checked={occasion.includes(occasionOption)}
                            onChange={handleOccasionChange}
                        />
                        {occasionOption}
                    </label>
                ))}
            </fieldset>

            <button type="submit" className="btn-primary"> Add clothing item</button>
        </form>
    </div>
}
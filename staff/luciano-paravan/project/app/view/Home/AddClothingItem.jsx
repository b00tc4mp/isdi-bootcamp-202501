import { Routes, Route, useNavigate } from 'react-router-dom'

import { logic } from '../../logic/index.js'
import { useState } from 'react'
import { SystemError, ValidationError } from 'com/errors'
import { useContext } from '../../context.js'

export function AddClothingItem({ onAddedClothingItem }) {
    const [itemName, setItemName] = useState('')
    const [category, setCategory] = useState('')
    const [type, setType] = useState('')
    const [color, setColor] = useState('')
    const [season, setSeason] = useState([])
    const [occasion, setOccasion] = useState([])

    const { alert, confirm } = useContext()

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

                alert(error.message)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
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

    return <div className="flex flex-col py-20">
        <h2 className="pl-4">Add Clothing Item</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
            <label className="text-[var(--first-color)]">
                Item name
                <input className="flex items-center w-full gap-2 text-[var(--text-color)]" type="text" value={itemName} onChange={event => setItemName(event.target.value)} required/>
            </label>

            <label className="flex items-center gap-2 text-[var(--first-color)]">
                Category
                <select className="text-[var(--text-color)]" type="text" value={category} onChange={event => setCategory(event.target.value)} required >
                    <option value="">Select Category</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="shoes">Shoes</option>
                    <option value="accessory">Accessory</option>
                </select>
            </label>            

            <label className="flex items-center gap-2 text-[var(--first-color)]">
                Type
                <input className="w-full text-[var(--text-color)]" type="text" value={type} onChange={event => setType(event.target.value)} placeholder="e.g., t-shirt, jeans, sneakers" required />
            </label>

            <label className="flex items-center gap-2 text-[var(--first-color)]">
                Color
                <input className="w-full text-[var(--text-color)]" type="text" value={color} onChange={event => setColor(event.target.value)} required />
            </label>

            <fieldset className="flex flex-col gap-2 md:gap-3 text-[var(--first-color)]">
                <legend>Season</legend>
                {['summer', 'winter', 'spring', 'autumn'].map(seasonOption => (
                    <label key={seasonOption} className="flex items-center gap-2 text-[var(--text-color)]">
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

            <fieldset className="flex flex-col gap-2 md:gap-3 text-[var(--first-color)]">
                <legend>Occasion</legend>
                {['formal', 'casual', 'sport', 'party'].map(occasionOption => (
                    <label key={occasionOption} className="flex items-center gap-2 text-[var(--text-color)]">
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
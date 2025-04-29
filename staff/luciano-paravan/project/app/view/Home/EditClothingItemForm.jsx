import { useEffect, useState } from 'react'

export function EditClothingItemForm ({ initialValues }) {
    const [formData, setFormData] = useState({
        itemName: '',
        category: '',
        type: '',
        color: '',
        season: [],
        occasion: []
    })

    useEffect(() => {
        retrieveClothingItem(itemId)
            .then(item => {
                setFormData({
                    category: item.category || '',
                    type: item.type || '',
                    color: item.color || '',
                    occasion: item.occasion || [],
                    season: item.occasion || []
                })
            })
            //TODO .catch
    }, [itemId])

    return (
        <form onSubmit={handleSubmit}>
        <input
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="Item Name"
        />
    
        <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
        />
    
        <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Type"
        />
    
        <input
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Color"
        />
    
        <fieldset>
            <legend>Season</legend>
            {['summer', 'winter', 'spring', 'autumn'].map(season => (
            <label key={season}>
                <input
                type="checkbox"
                name="season"
                value={season}
                checked={formData.season.includes(season)}
                onChange={handleCheckboxChange}
                />
                {season}
            </label>
            ))}
        </fieldset>
    
        <fieldset>
            <legend>Occasion</legend>
            {['formal', 'casual', 'sport', 'party'].map(occasion => (
            <label key={occasion}>
                <input
                type="checkbox"
                name="occasion"
                value={occasion}
                checked={formData.occasion.includes(occasion)}
                onChange={handleCheckboxChange}
                />
                {occasion}
            </label>
            ))}
        </fieldset>
    
        <button type="submit">Save changes</button>
        </form>
    )
}
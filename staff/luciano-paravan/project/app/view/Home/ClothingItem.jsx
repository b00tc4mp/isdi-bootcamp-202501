import { useEffect, useState } from 'react'
import { logic } from '../../logic/index.js'
import { CircleX, PenLine } from 'lucide-react'

import { useContext } from '../../context.js'

export function ClothingItem ({ clothingItem, onClothingItemDeleted, onClothingItemEdited }) {
    const { alert, confirm } = useContext()
    const [view, setView] = useState('')
    
    const [itemName, setItemName] = useState(clothingItem.itemName)
    const [category, setCategory] = useState(clothingItem.category)
    const [type, setType] = useState(clothingItem.type)
    const [color, setColor] = useState(clothingItem.color)
    const [season, setSeason] = useState(clothingItem.season)
    const [occasion, setOccasion] = useState(clothingItem.occasion)

    useEffect(() => {
        if (view === 'edit-item') {
            setItemName(clothingItem.itemName)
            setCategory(clothingItem.category)
            setType(clothingItem.type)
            setColor(clothingItem.color)
            setSeason(clothingItem.season)
            setOccasion(clothingItem.occasion)
        }
    }, [view, clothingItem])

    const handleSubmit = event => {
        event.preventDefault()

        try {
            logic.updateClothingItem(clothingItem.id, itemName, category, type, color, season, occasion)
                .then(() => {
                    onClothingItemEdited()
                    setView('')
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

    const handleEditClick = () => setView('edit-item')

    const handleDeleteClick = () => {
        confirm('Delete clothing item?')
        .then(accepted => {
            if(accepted)
            try {
                logic.deleteClothingItem(clothingItem.id)
                    .then(() => onClothingItemDeleted())
                    .catch(error => {
                        console.error(error)
                        alert(error.message)
                    })
            } catch (error) {
                console.error(error)
                alert(error.message)
            }
        })
    }

    const handleSeasonChange = event => {
        const { value } = event.target
        setSeason(prev => prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value])
    }

    const handleOccasionChange = event => {
        const { value } = event.target
        setOccasion(prev => prev.includes(value) ? prev.filter(o => o !== value) : [...prev, value])
    }

    const handleEditItemCancelClick = () => setView('')

    return <article className="flex flex-col rounded-lg bg-gray-990 p-4 shadow-md">
    {view === '' && <section>
        <h3 className="text-xl font-semibold text-[var(--text-color)] mb-2">{clothingItem.itemName}</h3>

        <div className="mb-2 space-y-1 text-sm text-[var(--text-color)]">
            <div className="flex flex-start md:block"><span className="font-semibold text-[var(--third-color)] mr-2 md:mr-0 md:mb-1">Category:</span><p>{clothingItem.category}</p></div>
            
            <div className="flex flex-start md:block">
                <span className="font-semibold text-[var(--third-color)] mr-2 md:mr-0 md:mb-1">Type: </span>
                <p>{clothingItem.type}</p>
            </div>

            <div className="flex flex-start md:block">
                <span className="font-semibold text-[var(--third-color)] mr-2 md:mr-0 md:mb-1">Color: </span>
                <p>{clothingItem.color}</p>
            </div>

            <div className="flex flex-start md:block">
                <span className="font-semibold text-[var(--third-color)] mr-2 md:mr-0 md:mb-1">Season: </span>
                <p>
                    {Array.isArray(clothingItem.season) && clothingItem.season.length > 0 ? clothingItem.season.join(', ')
                    : clothingItem.season}
                </p>
            </div>

            <div className="flex flex-start md:block">
                <span className="font-semibold text-[var(--third-color)] mr-2 md:mr-0 md:mb-1">Occasion: </span>
                <p>
                    {Array.isArray(clothingItem.occasion) && clothingItem.occasion.length > 0 ? clothingItem.occasion.join(', ') : clothingItem.occasion}
                </p>
            </div>
        </div>
    </section>}
    {view === 'edit-item' && <section>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 ">
            <label htmlFor="itemName">
                Item name:
                <input type="text" id="itemName" value={itemName} onChange={event => setItemName(event.target.value)} required/>
            </label>
            <label htmlFor="category">
                    Category:
                    <select type="text" id="category" value={category} onChange={event => setCategory(event.target.value)} required >
                        <option value="">Select Category</option>
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                        <option value="shoes">Shoes</option>
                        <option value="accessory">Accessory</option>
                    </select>
                </label>            

                <label htmlFor="type">
                    Type:
                    <input type="text" id="type" value={type} onChange={event => setType(event.target.value)} placeholder="e.g., t-shirt, jeans, sneakers" required />
                </label>

                <label htmlFor="color">
                    Color:
                    <input type="text" id="color" value={color} onChange={event => setColor(event.target.value)} required />
                </label>

                <fieldset aria-labelledby="season-legend" className="flex flex-col">
                    <legend id="season-legend">Season</legend>
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

                <fieldset aria-labelledby="occasion-legend" className="flex flex-col">
                    <legend id="occasion-legend">Occasion</legend>
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
            <button type="button" onClick={handleEditItemCancelClick} className="btn-primary w-full">Cancel</button>
            <button type="submit" className="btn-primary">Accept</button>
        </form>
    </section>}
    
    <div className="flex justify-end space-x-2 mt-4">
        <button onClick={handleEditClick} className="flex justify-center items-center p-2 rounded-md bg-[var(--third-color)] text-[var(--bg-color)]  text-sm gap-1">Edit<PenLine /></button>
        <button onClick={handleDeleteClick} className="flex justify-center items-center p-2 rounded-md bg-[var(--third-color)] text-[var(--bg-color)]  text-sm gap-1">Delete<CircleX color="black"/></button>
    </div>
    </article>
}
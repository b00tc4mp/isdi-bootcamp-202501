import { useState } from 'react'
import { logic } from '../../logic'

import { useContext } from '../../context.js'


export function ClothingItem (clothingItem, onClothingItemDeleted, onClothingItemEdited) {

    return <article className="flex flex-col">
        <h3>{clothingItem.itemName}</h3>

        <p>{clothingItem.category}</p>
        <p>{clothingItem.type}</p>
        <p>{clothingItem.color}</p>
        <p>{clothingItem.season}</p>
        <p>{clothingItem.occasion}</p>

        <button>Edit ✏️</button>
        <button>Delete 🗑️</button>
    </article>
}
import { useEffect, useState } from 'react'
import { ClothingItem } from './ClothingItem'

import { useContext } from '../../context'

import { logic } from '../../logic'

export function MyClothingItems() {
    const { alert } = useContext()
    const [clothingItems, setClothingItems] = useState([])

    useEffect(()=> {
        loadClothingItems()
    }, [])

    const loadClothingItems = () => {
        try {
            logic.getUserClothingItems()
                .then(clothingItems => setClothingItems(clothingItems))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleClothingItemDeleted = () => loadClothingItems()

    const handleClothingItemEdited = () => loadClothingItems()

    return <section className="py-20">
        {clothingItems.map(clothingItem => <ClothingItem key={clothingItem.id} clothingItem={clothingItem} onClothingItemEdited={handleClothingItemEdited} onClothingItemDeleted={handleClothingItemDeleted}/>)}
    </section>
}
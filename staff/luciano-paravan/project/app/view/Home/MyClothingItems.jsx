import { useEffect, useState } from 'react'
import { ClothingItem } from './ClothingItem'

import { useContext } from '../../context'

import { logic } from '../../logic'

export function MyClothingItems() {
    const { alert } = useContext()
    const [clothingItems, setClothingItems] = useState([])
    const [categoryFilter, setCategoryFilter] = useState(null)

    const filteredItems = categoryFilter ? clothingItems.filter(item => item.category === categoryFilter) :clothingItems

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
        <div className="flex justify-center-safe gap-2 mb-4">
            <button className="btn-tertiary" onClick={() => setCategoryFilter(null)}>All</button>
            <button className="btn-tertiary" onClick={() => setCategoryFilter('top')}>Top</button>
            <button className="btn-tertiary" onClick={() => setCategoryFilter('bottom')}>Bottom</button>
            <button className="btn-tertiary" onClick={() => setCategoryFilter('shoes')}>Shoes</button>
            <button className="btn-tertiary" onClick={() => setCategoryFilter('accessory')}>Accessory</button>
        </div>
        {filteredItems.map(clothingItem => <ClothingItem key={clothingItem.id} clothingItem={clothingItem} onClothingItemEdited={handleClothingItemEdited} onClothingItemDeleted={handleClothingItemDeleted}/>)}
    </section>
}
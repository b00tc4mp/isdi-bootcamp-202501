import { useEffect, useState } from 'react'

export function LookSuggestion () {
    const [look, setLook] = useState(null)

    const loadLook = () => {
        const simulatedResponse = {
            top: 'white t-shirt',
            bottom: 'blue jeans',
            shoes: 'white sneakers',
            accessories: ['watch', 'sunglasses']
        }

        setLook(simulatedResponse)
    }

    useEffect(() => {
        loadLook()
    }, [])

    return <div className="flex flex-col py-14">
        <h2>Look Suggestion</h2>

        {look !== null && <div className="py-4">
            <div>Top: {look.top}</div>
            <div>Bottom: {look.bottom}</div>
            <div>Shoes: {look.shoes}</div>
            
            <div>Accesories: 
                <ul>
                    {look.accessories.map((accessory, index) => (
                        <li key={index}>{accessory}</li>
                    ))}
                </ul>
            </div>
        </div>}


        <button onClick={loadLook} className="btn-primary">New suggestion</button>
    </div>
}

//TODO connect to API and check if its necessary to make another function in the button to get another suggestion
import { useState, useEffect } from 'react'

import { logic } from '../../logic'


export function Menus() {

    const [menus, setMenus] = useState([])

    useEffect(() => {
        loadMenus()
    },[])

    // debugger

    const loadMenus = () => {
        try{
            logic.getMenus()
                .then(menus => {
                    setMenus(menus)
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

    console.debug('Menus page renderized')

    return (
        <div>
            <div className="logo">Logo</div>
            <h1>MENUS 🥪</h1>
            <div>
                { menus.map(menu => (
                    <section key={menu._id} className="menu-item">
                        <h3>{menu.name}</h3>
                        <p>{menu.description}</p>
                        <p>{`Precio: ${menu.price}`}</p>
                    </section>
                )) }
            </div>
        </div>
    )
}


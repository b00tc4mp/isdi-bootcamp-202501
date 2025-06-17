import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { logic } from '../../logic'


export function Menus() {

    const [menus, setMenus] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const navigate = useNavigate()

    //cargamos todos los menus al principio
    useEffect(() => {
        loadMenus()
    },[])

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

    const handleCategorySelect = (event) => {
        const categories = event.target.value 
        setSelectedCategory(categories)

        if (categories === '') {
            loadMenus()
        } else {
            logic.getMenusByCategory([categories])
                .then(setMenus)
                .catch(error => {
                    console.error(error)
                })
        }
    }

    const handleOrderClick = (menu) => {
        const bread = prompt(`Elige el tipo de pan:\n${menu.breadOptions.join(', ')}`)

        if(!bread) return

        if(!menu.breadOptions.includes(bread)) {
            alert('Tipo de pan no válido')

            return
        }

        try {
            logic.createOrder(menu._id, bread)
                .then(() => {
                    alert('Orden creada con éxito ✅')
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

    const handleReturnClick = () => {
        navigate('/home')
    }

    console.debug('Menus page renderized')

    return (
        <div>
            <div className="logo">Logo</div>
            <h1>MENUS 🥪</h1>
            <div>
                <label htmlFor="category-select">Filter by category:</label>
                <select id="category-select" value={selectedCategory} onChange={handleCategorySelect}>
                    <option value="regular">Regular</option>
                    <option value="vegetariano">Vegetariano</option>
                    <option value="vegano">Vegano</option>
                    <option value="halal">Halal</option>
                </select>
            </div>
            <div>
                { menus.map(menu => (
                    <section key={menu._id} className="menu-item">
                        <h3>{menu.name}</h3>
                        <p>{menu.description}</p>
                        <p>{`Precio: ${menu.price}`}</p>
                        <button onClick={() => handleOrderClick(menu)}>Comprar</button>
                    </section>
                )) }
            </div>

            <button onClick={handleReturnClick}>Volver a la página principal</button>
        </div>
    )
}


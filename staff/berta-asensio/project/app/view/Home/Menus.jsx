import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { logic } from '../../logic'


export function Menus() {

    const [menus, setMenus] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        loadMenus()
    }, [])

    const loadMenus = () => {
        try {
            logic.getMenus()
                .then(menus => {
                    const transformedMenus = menus.map(menu => {
                        menu.id = menu.id.toString()
                        delete menu._id
                        return menu
                    })

                    setMenus(transformedMenus)
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
        navigate(`/make-order/${menu.id}`)
    }

    const handleReturnClick = () => {
        navigate('/home')
    }

    console.debug('Menus page renderized')

    return (
        <div className="min-h-screen flex flex-col items-center bg-green-200 p-6">
            <header className="w-full flex justify-between items-center mb-6 px-4">
                <h1 
                    className="text-4xl font-bold text-green-900 whitespace-nowrap">
                    MENÚS
                </h1>
                <img
                    src="/logo.png"
                    alt="Little Breakfast logo"
                    className="w-30"
                />
            </header>

            <div className="w-full max-w-3xl flex justify-between items-center mb-4">
                <div></div>
                <div className="w-48">
                    <label 
                        htmlFor="category-select"
                        className="block mb-2 font-semibold text-green-900"
                    >
                        Filtrar por categoría:
                    </label>
                    <select 
                        id="category-select" 
                        value={selectedCategory} 
                        onChange={handleCategorySelect}
                        className="w-full rounded-md border border-green-600 px-3 py-2 text-green-900"
                    >
                        <option value="todas">Todas</option>
                        <option value="vegetariano">Vegetariano</option>
                        <option value="vegano">Vegano</option>
                        <option value="halal">Halal</option>
                    </select>
                </div>
            </div>

            <div className="w-full max-w-3xl space-y-6 mb-10">
                { menus.map(menu => (
                    <section 
                        key={menu.id} 
                        className="bg-green-100 rounded-xl p-5 shadow-lg border border-green-300"
                    >
                        <h3 className="text-2xl font-semibold text-green-900 mb-2">
                            {menu.name}
                        </h3>
                        <p className="text-green-800 mb-3">
                            {menu.description}
                        </p>
                        <p className="font-semibold text-green-900 mb-4">
                            {`Precio: ${menu.price}`}
                        </p>
                        <button 
                            onClick={() => handleOrderClick(menu)}
                            className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold px-5 py-2 rounded-md transition"
                        >
                            Comprar
                        </button>
                    </section>
                    )
                )}
            </div>

            <button 
                onClick={handleReturnClick}
                className="bg-green-200 hover:bg-green-300 text-green-900 px-6 py-2 rounded-md transition"
            >
                Volver a la página principal
                
            </button>
        </div>
    )
}


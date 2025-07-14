import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { logic } from '../../logic'
import { useContext } from '../../context'

export function OrderForm() {
    const { menuId } = useParams()
    const [menu, setMenu] = useState(null)
    const [bread, setBread] = useState('')
    const [note, setNote] = useState('')

    const navigate = useNavigate()
    const { alert, confirm } = useContext()

    useEffect(() => {
        try {
            logic.getMenuById(menuId)
                .then(setMenu)
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }, [menuId])

    const handleSubmit = () => {

        if (!bread || !note.trim()) {
            alert('Por favor, selecciona el pan y escribe el nombre y colegio.')
            return
        }

        confirm('¿Confirmar pedido?')
            .then(accepted => {
                if (!accepted) return

                try {
                    logic.createOrder(menuId, bread, note.trim())
                        .then(() => {
                            alert('Pedido realizado con éxito')
                            navigate('/orders')
                        })
                        .catch(error => {
                            console.error(error)
                            if(error.message === 'Insufficient credit')
                            confirm('Crédito insuficiente. ¿Quieres añadir crédito ahora?')
                                .then(accepted => {
                                    if (accepted) navigate('/add-credit', { state: { returnTo: `/make-order/${menuId}` } })
                                })
                        })
                } catch (error) {
                    console.error(error)
                    alert(error.message)
                }
            })
    }

    const handleCancelClick = () => {
        navigate('/menus')
    }

    if (!menu) return <p>Cargando menú...</p>

    return (
        <div className="min-h-screen flex flex-col items-center bg-green-200 p-6">
            <header className="w-full flex justify-between items-center mb-6 px-4">
                <img 
                    src="/logo.png" 
                    alt="Little Breakfast logo" 
                    className="w-30" 
                />
            </header>
            <section className="w-full max-w-md bg-green-100 p-6 rounded-xl shadow-lg border border-green-300">
                <h1 className="text-2xl font-bold text-green-900 mb-4">
                    Pedido: {menu.name}
                </h1>

                <div className="mb-4">
                    <label className="block mb-2 font-semibold text-green-900">
                        Tipo de pan:
                    </label>
                    <select 
                        value={bread} 
                        onChange={event => setBread(event.target.value)}
                        className="w-full rounded-md border border-green-600 px-3 py-2 text-green-900"
                    >
                        <option value="">Selecciona pan</option>
                        {menu.breadOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-semibold text-green-900">
                        Nombre del niño y Colegio:
                    </label>
                    <textarea
                        value={note}
                        onChange={event => setNote(event.target.value)}
                        rows="3"
                        placeholder='Ej. Rana Roja - Colegio RRR'
                        className="w-full rounded-md border border-green-600 px-3 py-2 text-green-900"
                    />
                </div>

                <div className="flex justify-between gap-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold px-5 py-2 rounded-md transition w-full"
                    >
                        Tramitar pedido
                    </button>
                    <button
                        onClick={handleCancelClick}
                        className="bg-green-200 hover:bg-green-300 text-green-900 font-semibold px-5 py-2 rounded-md transition w-full"
                    >
                        Cancelar
                    </button>
                </div>
            </section>
        </div>
    )
}
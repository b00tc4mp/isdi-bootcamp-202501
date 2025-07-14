import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { logic } from '../../logic'
import { useContext } from '../../context'

export function Orders() {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    const { alert, confirm } = useContext()

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = () => {
        try {
            const userId = logic.getUserId()

            logic.getOrdersByUser(userId)
                .then(setOrders)
                .catch(error => {
                    console.error(error)
                    
                    alert(error.message)
                })  
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteClick = (orderId) => {
        confirm('¿Eliminar pedido?')
        .then(accepted => {
            if (!accepted) return

            return logic.deleteOrder(orderId)
                .then(() => loadOrders())
        })
        .catch(error => {
            console.error(error)
            alert(error.message)
        })
}

    const handleReturnClick = () => {
        navigate('/menus')
    }

    const handleReturnClick2 = () => {
        navigate('/home')
    }

    console.debug('Orders page renderized')


    return (
        <div className="min-h-screen flex flex-col items-center bg-green-200 p-6">
            <header className="w-full flex justify-between items-center mb-6 px-4">
                <h1 className="text-4xl font-bold text-green-900">Mis pedidos</h1>
                <img
                    src="/logo.png"
                    alt="Little Breakfast logo"
                    className="w-30"
                />
            </header>

            {orders.length === 0 ? (
                <div className="text-center bg-green-100 rounded-xl shadow-lg p-6 max-w-md w-full">
                    <p className="text-green-800 mb-2">No tienes pedidos todavía.</p>
                    <p className="text-green-900 font-semibold mb-4">¡Empieza ahora con tu primer pedido!</p>
                    <button
                        onClick={() => navigate('/menus')}
                        className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold px-5 py-2 rounded-md transition"
                    >
                        Ver menús
                    </button>
                </div>
            ) : (
                <ul className="w-full max-w-3xl space-y-6 mb-10">
                    {orders.map(order => (
                        <li
                            key={order.id}
                            className="bg-green-100 rounded-xl p-5 shadow-lg border border-green-300"
                        >
                            <h3 className="text-xl font-semibold text-green-900 mb-1">{order.menu.name}</h3>
                            <p className="text-green-800 mb-1">Pan: {order.bread}</p>
                            <p className="text-green-800 mb-1">
                                Fecha del pedido: {new Date(order.createdAt).toLocaleString()}
                            </p>
                            {order.note && (
                                <p className="text-green-800 mb-1">Nota: {order.note}</p>
                            )}
                            {order.status && (
                                <p className="text-green-800 mb-1">Estado: {order.status}</p>
                            )}
                            {order.deliveryDate && (
                                <p className="text-green-800 mb-4">
                                    Fecha de entrega: {new Date(order.deliveryDate).toLocaleDateString()}
                                </p>
                            )}
                            <button
                                onClick={() => handleDeleteClick(order.id)}
                                className="bg-red-200 hover:bg-red-300 text-red-800 font-semibold px-4 py-2 rounded-md transition"
                            >
                                Eliminar pedido
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex gap-4">
                <button
                    onClick={handleReturnClick}
                    className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold px-5 py-2 rounded-md transition"
                >
                    Volver a Menús
                </button>
                <button
                    onClick={handleReturnClick2}
                    className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold px-5 py-2 rounded-md transition"
                >
                    Página principal
                </button>
            </div>
        </div>
    )
}

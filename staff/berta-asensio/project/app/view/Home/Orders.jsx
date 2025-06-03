import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { logic } from '../../logic'

export function Orders() {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

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

    const handleReturnClick = () => {
        navigate('/menus')
    }

        console.debug('Orders page renderized')


    return (
        <section>
            <h1>Mis pedidos</h1>

            {orders.length === 0 && (
                <div>
                    <p>No tienes pedidos todavía.</p>
                    <p>¡Empieza ahora con tu primer pedido!</p>
                    <button onClick={() => navigate('/menus')}>Ver menús</button>
                </div>
            )}

            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        <strong>{order.menu.name}</strong> - Pan: {order.bread}
                        <br />
                        Fecha: {new Date(order.createdAt).toLocaleString()}
                        {order.status && <><br />Estado: {order.status}</>}
                    </li>
                ))}
            </ul>

            <button onClick={handleReturnClick}>Volver a Menús</button>
        </section>
    )
}

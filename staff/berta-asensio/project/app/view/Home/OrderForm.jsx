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
        <section>
            <h1>Pedido: {menu.name}</h1>

            <label>Tipo de pan:</label>
            <select value={bread} onChange={event => setBread(event.target.value)}>
                <option value="">Selecciona pan</option>
                {menu.breadOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            <label>Nombre del niño y colegio:</label>
            <textarea
                value={note}
                onChange={event => setNote(event.target.value)}
                rows="3"
                placeholder="Ej. Berta - CEIP Vaixell Burriac"
            />

            <button onClick={handleSubmit}>Tramitar pedido</button>
            <button onClick={handleCancelClick}>Cancelar</button>
        </section>
    )
}
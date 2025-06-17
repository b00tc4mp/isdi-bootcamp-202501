import { logic } from '../../logic'
import { useContext } from '../../context'
import { useNavigate } from 'react-router'
import { useState } from 'react'

export function AddCredit() {
    const { alert } = useContext()
    const [amount, setAmount] = useState('')
    const navigate = useNavigate()

    const handleFormSubmit = event => {
        event.preventDefault()

        try {
            const parsedAmount = parseFloat(amount)

            logic.addUserCredit(parsedAmount)
                .then(() => {
                    alert(`Crédito añadido: ${parsedAmount} €`)
                    navigate('/home')
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

    return (
        <div className="add-credit">
            <h2>Añadir crédito</h2>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Importe:
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} min="0.50" step="0.5"
                    />
                </label>
                <button type="submit">Añadir</button>
            </form>

            <button onClick={handleReturnClick}>Atrás</button>
        </div>
    )
}
    
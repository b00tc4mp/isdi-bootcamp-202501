import { logic } from '../../logic'
import { useContext } from '../../context'
import { useNavigate, useLocation } from 'react-router'
import { useState } from 'react'

export function AddCredit() {
    const { alert } = useContext()
    const [amount, setAmount] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const returnTo = location.state?.returnTo || '/home'

    const handleFormSubmit = event => {
        event.preventDefault()

        try {
            const parsedAmount = parseFloat(amount)

            logic.addUserCredit(parsedAmount)
                .then(() => {
                    alert(`Crédito añadido: ${parsedAmount} €`)
                    navigate(returnTo)
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
        <div className="min-h-screen flex flex-col items-center p-15  bg-green-200">
            <h2 className="text-3xl font-semibold mb-7 text-green-900">Añadir crédito</h2>
            <form onSubmit={handleFormSubmit} className="w-full max-w-md">
                <div className="field">
                    <label htmlFor="amount" className="font-semibold">Importe:</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        min="1"
                        step="1"
                        placeholder="1 €"
                        required
                    />
                </div>
                <div className="flex flex-col items-center gap-4 mt-6">
                    <button
                        type="submit"
                        className="w-48 py-2 bg-green-400 hover:bg-green-500 text-green-900 font-semibold rounded-md transition"
                    >
                        Añadir
                    </button>

                    <button
                        onClick={handleReturnClick}
                        className="w-48 py-2 bg-green-200 hover:bg-green-300 text-green-900 font-semibold rounded-md transition mt-4"
                    >
                        Volver
                    </button>
                </div>
            </form>
        </div>
    )
}
    
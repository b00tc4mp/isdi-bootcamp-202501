import { useState, useEffect } from 'react'
import { useContext } from '../context'
import { EndLevelScreen } from './endLevelScreen'

import { logic } from '../logic'

export function Level({ level }) {
    const { alert } = useContext()

    const [view, setView] = useState('')
    const [type, setType] = useState('')
    const [showEndLevel, setShowEndLevel] = useState(false)
    const [levelIsPassed, setLevelIsPassed] = useState(false)

    useEffect(() => {
        try {
            setView('closed')
            setType(level.type)
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleLevelClick = () => setView('opened')
    const handlePlayClick = () => setView('inGame')
    const handleCancelClick = () => setView('closed')

    const handleResponseClick = event => {
        event.preventDefault()

        try {
            const form = event.target
            const selector = form.querySelector('input[name="userAnswer"]:checked')
            const userAnswer = selector?.value

            logic.isLevelPassed(level.id, userAnswer)
                .then(isPassed => {
                    form.reset()
                    setLevelIsPassed(isPassed)
                    setShowEndLevel(true)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="bg-white bg-opacity-90 border border-purple-200 rounded-xl p-4 shadow-md transition-all">
            {view === 'closed' && (
                <button
                    onClick={handleLevelClick}
                    className="w-full text-left text-purple-900 font-semibold hover:text-purple-700"
                >
                    ✨ {level.name}
                </button>
            )}

            {view === 'opened' && (
                <section>
                    <h2 className="text-xl font-bold text-purple-800">{level.name}</h2>
                    <p className="text-sm text-purple-600 mb-2">{level.description}</p>

                    {level.isBlocked ? (
                        <button className="bg-gray-300 text-gray-600 font-medium py-1 px-4 rounded-lg cursor-not-allowed">
                            Play 🔒
                        </button>
                    ) : (
                        <button
                            className="bg-purple-600 hover:bg-purple-400 text-white font-bold py-1 px-4 rounded-lg"
                            onClick={handlePlayClick}
                        >
                            Jugar
                        </button>
                    )}

                    <button
                        onClick={handleCancelClick}
                        className="ml-4 text-sm text-purple-400 hover:text-purple-600 underline"
                    >
                        Cancelar
                    </button>
                </section>
            )}

            {view === 'inGame' && (
                <section className="mt-2 space-y-2">
                    <h3 className="text-lg font-bold text-purple-800">{level.name}</h3>
                    <p className="text-purple-600">{level.description}</p>
                    <p className="text-purple-700 italic">{level.body}</p>

                    <form onSubmit={handleResponseClick} className="space-y-2 mt-2">
                        {type === 'quiz' && level.resultOptions.map((option, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <input type="radio" id={option} name="userAnswer" value={option} className="accent-mauve" />
                                <label htmlFor={option} className="text-purple-700">{option}</label>
                            </div>
                        ))}

                        <button className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-4 rounded-full">
                            Enviar respuesta
                        </button>
                    </form>
                </section>
            )}

            {showEndLevel && <EndLevelScreen level={level} isPassed={levelIsPassed} />}
        </div>
    )
}

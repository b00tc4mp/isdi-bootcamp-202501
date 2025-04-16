import { useState, useEffect } from 'react'
import { logic } from '../logic'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { useContext } from '../context'

import { Ranking } from './Ranking'
import { Levels } from './Levels'
import { Profile } from './Profile'
import { Level } from './Level'

export function Home({ onNavigateToProfile, onUserLoggedOut }) {
    const { alert } = useContext()
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    const [activeLevel, setActiveLevel] = useState(null)

    const { pathname } = useLocation()

    useEffect(() => {
        try {
            logic.getUserUsername()
                .then(username => setUsername(username))
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleUsernameClick = () => navigate('/profile')
    const handleLevelSelected = (level) => setActiveLevel(level)
    const handleBackToLevels = () => setActiveLevel(null)

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-100 to-[#c6d3ff] text-purple-800 font-sans">
            <header className="flex justify-between items-center p-4 bg-purple-300 shadow-md">
                <p className="text-xl font-bold">🧙‍♂️ Code Quest</p>
                <p
                    onClick={handleUsernameClick}
                    className="text-sm hover:text-purple-700 cursor-pointer"
                >
                    ¡Hola, {username}!
                </p>
            </header>

            <main className="px-4 pt-6">
                <Routes>
                    <Route
                        path="/"
                        element={
                            activeLevel ? (
                                <div>
                                    <button
                                        onClick={handleBackToLevels}
                                        className="mb-4 text-sm text-purple-700 underline"
                                    >
                                        ← Volver a los mundos
                                    </button>
                                    <Level level={activeLevel} />
                                </div>
                            ) : (
                                <>
                                    <section className="bg-white bg-opacity-80 rounded-xl p-4 shadow-md mb-4">
                                        <h2 className="text-lg font-bold mb-2">🏆 Ranking</h2>
                                        <Ranking />
                                    </section>

                                    <section className="bg-white bg-opacity-80 rounded-xl p-4 shadow-md">
                                        <h2 className="text-lg font-bold mb-2">🗺️ Mundos</h2>
                                        <Levels onLevelSelected={handleLevelSelected} />
                                    </section>
                                </>
                            )
                        }
                    />
                    <Route path="/profile" element={<Profile onUserLoggedOut={onUserLoggedOut} />} />
                </Routes>
            </main>
        </div>
    )
}
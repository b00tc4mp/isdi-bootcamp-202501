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
  const [currentLevel, setCurrentLevel] = useState(null)

  const { pathname } = useLocation()

  useEffect(() => {
    try {
      logic
        .getUserUsername()
        .then((username) => setUsername(username))
        .catch((error) => alert(error.message))
    } catch (error) {
      alert(error.message)
    }
  }, [])

  const handleUsernameClick = () => navigate('/profile')
  const handleLevelSelected = (level) => setActiveLevel(level)
  const handleBackToLevels = () => setActiveLevel(null)
  const handleLogoClick = () => navigate('/')

  const handlePlayClick = () => {
    try {
      logic.getCurrentLevel().then((currentLevel) => setActiveLevel(currentLevel))
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-purple-100 to-[#c6d3ff] text-purple-800 font-sans'>
      <header className='flex justify-between items-center p-4 bg-purple-300 shadow-md'>
        <p onClick={handleLogoClick} className='text-xl font-bold'>
          🧙‍♂️ Code Quest
        </p>
        <p onClick={handleUsernameClick} className='text-sm hover:text-purple-700 cursor-pointer'>
          ¡Hola, {username}!
        </p>
      </header>

      <main className='px-4 pt-6'>
        <Routes>
          <Route
            path='/'
            element={
              activeLevel ? (
                <div>
                  <button onClick={handleBackToLevels} className='mb-4 text-sm text-purple-700 underline'>
                    ← Return to home
                  </button>
                  <Level level={activeLevel} currentState={'opened'} onCancelled={handleBackToLevels} />
                </div>
              ) : (
                <>
                  <Ranking currentState={'closed'} />

                  <h2 className='text-lg font-bold mb-2'>🗺️ Levels map</h2>
                  <Levels onLevelSelected={handleLevelSelected} />

                  <button
                    onClick={handlePlayClick}
                    className='w-full flex items-center justify-start gap-2 transition 
    py-3 px-4 rounded-lg shadow  bg-purple-600 hover:bg-purple-400 text-white font-bold mt-3 mb-3'
                  >
                    Play
                  </button>
                </>
              )
            }
          />
          <Route path='/profile' element={<Profile onUserLoggedOut={onUserLoggedOut} onBackClick={handleBackToLevels} />} />
        </Routes>
      </main>
    </div>
  )
}

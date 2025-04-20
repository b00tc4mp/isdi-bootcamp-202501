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
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const [activeLevel, setActiveLevel] = useState(null)
  const [currentLevel, setCurrentLevel] = useState(null)

  const { pathname } = useLocation()

  useEffect(() => {
    try {
      logic
        .getUser()
        .then((user) => {
          setUsername(user.username)
          setUser(user)
        })
        .catch((error) => alert(error.message))
    } catch (error) {
      alert(error.message)
    }
  }, [])

  const handleUsernameClick = () => navigate('/profile')
  const handleLevelSelected = (level) => setActiveLevel(level)
  const handleBackToLevels = () => {
    setActiveLevel(null)
    navigate('/')
  }
  const handleLogoClick = () => {
    setActiveLevel(null)
    navigate('/')
  }

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
      <header className='flex justify-between items-center p-0.5 pl-4 pr-4 bg-purple-300 shadow-md'>
        <img src='../public/Logo.png' alt='Code Quest logo' className='h-17 w-auto' onClick={handleLogoClick} />
        {/* <p onClick={handleLogoClick} className='text-xl font-bold'>
          🧙‍♂️ Code Quest
        </p> */}
        {/* <p onClick={handleUsernameClick} className='text-sm hover:text-purple-700 cursor-pointer'>
          ¡Hola, {username}!
        </p> */}
        {user && <img src={user.image} alt='Perfil' className='h-16 w-auto' onClick={handleUsernameClick} />}
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
                  <Level level={activeLevel} currentState={activeLevel.isBlocked ? 'opened' : 'inGame'} onCancelled={handleBackToLevels} />
                </div>
              ) : (
                <>
                  <Ranking currentState={'closed'} username={username} />

                  <Levels onLevelSelected={handleLevelSelected} />

                  <button
                    onClick={handlePlayClick}
                    className='w-full flex items-center justify-start gap-2 transition 
    py-3 px-4 rounded-lg shadow  bg-green-400 hover:bg-purple-400 text-white font-bold mt-3 mb-3'
                  >
                    Play
                  </button>
                </>
              )
            }
          />
          <Route path='/profile' element={<Profile onUserLoggedOut={onUserLoggedOut} user={user ? user : null} onNavigateToHome={handleBackToLevels} />} />
        </Routes>
      </main>
    </div>
  )
}

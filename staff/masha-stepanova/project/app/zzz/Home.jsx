import { useState, useEffect } from 'react'
import { logic } from '../logic'
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { useContext } from '../context'

import { Ranking } from '../view/Ranking'
import { Levels } from '../view/Levels'
import { Profile } from '../view/Profile'
import { Level } from '../view/Level'

export function Home({ onNavigateToProfile, onUserLoggedOut }) {
  const { alert } = useContext()
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [activeLevel, setActiveLevel] = useState(null)
  const [currentLevel, setCurrentLevel] = useState(null)
  const [totalLevels, setTotalLevels] = useState(0)
  const [progress, setProgress] = useState(0)

  const navigate = useNavigate()

  const { pathname } = useLocation()

  useEffect(() => {
    try {
      Promise.all([logic.getUser(), logic.getCurrentLevel(), logic.getLevels()])
        .then(([user, currentLevel, levels]) => {
          setUser(user)
          setUsername(user.username)
          setCurrentLevel(currentLevel)
          setTotalLevels(levels.length)
          const completed = user.generalProgress?.length || 0
          setProgress((completed / levels.length) * 100)
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }, [])

  const handleBackToHome = () => {
    setActiveLevel(null)
    navigate('/')
  }

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
      logic
        .getCurrentLevel()
        .then((currentLevel) => setActiveLevel(currentLevel))
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-purple-100 to-[#c6d3ff] text-purple-800 font-sans'>
      <header className='flex justify-between items-center px-4 py-2 bg-purple-300 shadow-md'>
        {user && <img src={user.image} alt='Perfil' className='h-16 w-auto' onClick={handleUsernameClick} />}

        <img src='../public/Logo.png' alt='Code Quest logo' className='h-17 w-auto' onClick={handleLogoClick} />

        <div className='flex items-center gap-4 text-xl'>
          <button onClick={() => navigate('/ranking')}>🏆</button>
          <button onClick={() => navigate('/levels')}>📜</button>
          <div className='flex items-center text-yellow-500 font-bold'>⭐ {user?.score ?? 0}</div>
        </div>
      </header>

      <div className='min-w-4 bg-purple-200 rounded-full h-3 mt-4 mb-4 ml-2 mr-2'>
        <div className='bg-purple-600 h-3 rounded-full transition-all duration-500' style={{ width: `${progress}%` }} />
      </div>

      <main className='px-4 pb-6'>
        <Routes>
          <Route
            path='/'
            element={
              activeLevel ? (
                <div>
                  <button onClick={handleBackToHome} className='mb-4 text-sm text-purple-700 underline'>
                    ← Volver al mapa
                  </button>
                  <Level level={activeLevel} currentState={activeLevel.isBlocked ? 'opened' : 'inGame'} onCancelled={handleBackToHome} />
                </div>
              ) : (
                <>
                  {currentLevel && (
                    <section className="bg-[url('/public/pergamino.png')] bg-cover bg-center bg-no-repeat rounded-xl p-6 mb-6 min-h-85">
                      <div className='p-5'>
                        <h2 className='text-2xl font-bold text-purple-800 mb-2 mt-2'>{currentLevel.name}</h2>
                        <p className='text-purple-700 whitespace-pre-line'>{currentLevel.description}</p>
                      </div>
                    </section>
                  )}

                  <div className='flex justify-center mb-6 '>
                    <button onClick={handlePlayClick} className='bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md min-w-65'>
                      Play level
                    </button>
                  </div>
                </>
              )
            }
          />
          <Route path='/profile' element={<Profile onUserLoggedOut={onUserLoggedOut} user={user} onNavigateToHome={handleBackToHome} />} />
        </Routes>
      </main>
    </div>
  )
}

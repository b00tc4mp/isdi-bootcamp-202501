import { useState, useEffect } from 'react'
import { Ranking } from './Ranking'
import { useContext } from '../context'

import { logic } from '../logic'

export function Profile({ onUserLoggedOut, user, onNavigateToHome }) {
  const { alert, confirm } = useContext()
  const [totalLevels, setTotalLevels] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    try {
      logic.getLevels().then((levels) => {
        setTotalLevels(levels.length)
        const completed = user?.generalProgress?.length || 0
        setProgress((completed / levels.length) * 100)
      })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }, [])

  const handleBackToHome = () => onNavigateToHome()

  const handleLogoutClick = () => {
    confirm(`Do you really want to log out?`).then((accepted) => {
      if (accepted) {
        try {
          logic.logoutUser()

          onUserLoggedOut()
        } catch (error) {
          console.error(error)

          alert(error.message)
        }
      }
    })
  }

  return (
    <>
      <a onClick={handleBackToHome} className='text-md text-purple-700 underline'>
        ← Return to home
      </a>
      <section className='bg-white/75 rounded-xl shadow-md p-4 flex justify-center mb-3 mt-3'>
        {user && (
          <section>
            <img src={user.image} alt='Perfil' className='w-28 h-28 justify-self-center' />

            <div className='w-full bg-purple-200 rounded-full h-3 mt-2 mb-4'>
              <div className='bg-purple-600 h-3 rounded-full transition-all duration-500' style={{ width: `${progress}%` }} />
            </div>

            <div className='space-y-1 justify-items-center'>
              <h2 className='text-2xl font-bold text-purple-900'>{user?.name}</h2>
              <p className='text-md'>
                <span className='font-medium'>{user?.username}</span>
              </p>
              <p className='text-md underline'>
                <span className='font-medium'>{user?.email}</span>
              </p>
            </div>
          </section>
        )}
      </section>
      <Ranking currentState={'closed'} username={user ? user.username : null} />
      <footer>
        <a onClick={handleLogoutClick} className='text-md w-full flex underline justify-center'>
          Logout
        </a>
      </footer>
    </>
  )
}

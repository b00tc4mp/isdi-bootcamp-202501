import { useState, useEffect } from 'react'
import { Ranking } from './Ranking'
import { useContext } from '../context'

import { logic } from '../logic'

export function Profile({ onUserLoggedOut, user, onNavigateToHome }) {
  const { alert, confirm } = useContext()
  const [view, setView] = useState('')

  useEffect(() => {
    try {
      setView('general')
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }, [])

  const handleBackToHome = () => onNavigateToHome()

  const handleLogoutClick = () => {
    confirm('Do you really want to log out?').then((accepted) => {
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
      <section>
        <button onClick={handleBackToHome} className='mb-4 text-sm text-purple-700 underline'>
          ← Return to home
        </button>
        {user && (
          <section>
            <img src={user.image} alt='Perfil' className='h-30 w-auto mb-2' />
            <h1>{user.username}</h1>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>password</p>
          </section>
        )}
      </section>
      {view === 'general' && <Ranking currentState={'opened'} username={user ? user.username : null} />}
      <footer>
        <a onClick={handleLogoutClick}>Logout</a>
      </footer>
    </>
  )
}

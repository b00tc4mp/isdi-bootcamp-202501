import { useState, useEffect } from 'react'
import { Ranking } from './Ranking'
import { useContext } from '../context'
import { useNavigate } from 'react-router'

import { logic } from '../logic'
import { Home } from './Home'

export function Profile({ onUserLoggedOut, onBackClick }) {
  const { alert, confirm } = useContext()
  const [view, setView] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    try {
      setView('general')
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }, [])

  const handleBackToHome = () => navigate('/')

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
          ← Volver a los mundos
        </button>
      </section>
      {view === 'general' && <Ranking currentState={'opened'} />}
      <footer>
        <a onClick={handleLogoutClick}>Logout</a>
      </footer>
    </>
  )
}

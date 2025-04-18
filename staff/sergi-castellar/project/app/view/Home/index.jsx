import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router'

import { Calendar } from './Calendar'
import { Diary } from './Diary'
import { Feelings } from './Feelings'
import { MainMenu } from './MainMenu'
import { Lists } from './Lists'
import { InviteScreen } from '../InviteScreen'

import { logic } from '../../logic'

export function Home({ onUserLoggedOut }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [isInCouple, setIsInCouple] = useState(null)
  const [isInCoupleLoaded, setIsInCoupleLoaded] = useState(false)

  useEffect(() => {
    try {
      logic
        .isUserInCouple()
        .then((result) => {
          setIsInCouple(result)
          setIsInCoupleLoaded(true)

          if (result && location.pathname === '/invite') {
            navigate('/home', { replace: true })
          }

          if (!result && location.pathname !== '/invite') {
            navigate('/invite', { replace: true })
          }
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }, [location.pathname, navigate])

  const handleLogoutClick = () => {
    const accepted = confirm('Do you want to logout?')
    if (accepted)
      try {
        logic.logoutUser()

        onUserLoggedOut()
      } catch (error) {
        console.error(error)

        alert(error.message)
      }
  }

  const handleCalendarClick = () => {
    navigate('/calendar')
  }

  const handleListsClick = () => {
    navigate('/lists')
  }

  const handleDiaryClick = () => {
    navigate('/diary')
  }

  const handleFeelingsClick = () => {
    navigate('/feelings')
  }

  if (!isInCoupleLoaded) return null

  return (
    <>
      <div className='bg-pink-100 flex flex-col items-center justify-center'>
        <button type='button' onClick={handleLogoutClick}>
          Logout
        </button>
        <div className='w-full flex justify-center py-6'>
          <img className='w-32 h-auto' src='../assets/asset_no_border_logo.png' alt='CoupleApp logo' />
        </div>
      </div>

      <Routes>
        {isInCouple ? (
          <>
            <Route path='/home' element={<MainMenu onCalendarClick={handleCalendarClick} onListsClick={handleListsClick} onDiaryClick={handleDiaryClick} onFeelingsClick={handleFeelingsClick} />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/lists' element={<Lists />} />
            <Route path='/diary' element={<Diary />} />
            <Route path='/feelings' element={<Feelings />} />
            <Route path='/invite' element={<Navigate to='/home' />} />
          </>
        ) : (
          <>
            <Route path='/invite' element={<InviteScreen />} />
            <Route path='*' element={<Navigate to='/invite' />} />
          </>
        )}
      </Routes>
    </>
  )
}

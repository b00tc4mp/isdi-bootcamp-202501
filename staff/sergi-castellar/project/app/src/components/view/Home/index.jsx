import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router'

import { Calendar } from '../../Calendar'
import { Diary } from '../../Diary'
import { Emotions } from '../../Emotions'
import { MainMenu } from './MainMenu'
import { Lists } from '../../Lists'
import { InviteScreen } from '../../InviteScreen'
import { SetDateStart } from '../../SetDateStart'

import { logic } from '../../../logic'
import { useContext } from '../../../context'

export function Home({ onUserLoggedOut }) {
  const { alert, confirm } = useContext()

  const navigate = useNavigate()
  const location = useLocation()

  const [isInCouple, setIsInCouple] = useState(null)
  const [isInCoupleLoaded, setIsInCoupleLoaded] = useState(false)
  const [hasDateStart, setHasDateStart] = useState(null)

  useEffect(() => {
    try {
      logic
        .isUserInCouple()
        .then((result) => {
          setIsInCouple(result)

          if (!result) {
            setIsInCoupleLoaded(true)
            if (location.pathname !== '/invite') {
              navigate('/invite', { replace: true })
            }
            return
          }

          logic.getCoupleInfo().then(({ daysInRelationship }) => {
            const hasDate = daysInRelationship > 0
            setHasDateStart(hasDate)
            setIsInCoupleLoaded(true)

            if (!hasDate && location.pathname !== '/set-date-start') {
              navigate('/set-date-start', { replace: true })
            } else if (hasDate && location.pathname === '/invite') {
              navigate('/home', { replace: true })
            }
          })
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
    confirm('Do you want to logout?').then((accepted) => {
      if (accepted)
        try {
          logic.logoutUser()

          onUserLoggedOut()
        } catch (error) {
          console.error(error)

          alert(error.message)
        }
    })
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

  const handleEmotionsClick = () => {
    navigate('/emotions')
  }

  if (!isInCoupleLoaded) return null

  return (
    <>
      <div className='bg-pink-100 flex flex-col items-center relative w-full'>
        <button type='button' onClick={handleLogoutClick} className='absolute top-4 right-4 px-4 py-2 bg-pink-400 text-white rounded-md shadow hover:bg-pink-700 transition-colors text-sm sm:text-base'>
          Logout
        </button>
        <div className='w-full flex justify-center py-6'>
          <img className='w-32 h-auto' src='../src/assets/asset_no_border_logo.png' alt='CoupleApp logo' />
        </div>
      </div>

      <Routes>
        {!isInCouple ? (
          <>
            <Route path='/invite' element={<InviteScreen />} />
            <Route path='/*' element={<Navigate to='/invite' />} />
          </>
        ) : !hasDateStart ? (
          <>
            <Route path='/set-date-start' element={<SetDateStart />} />
            <Route path='/*' element={<Navigate to='/set-date-start' />} />
          </>
        ) : (
          <>
            <Route path='/home' element={<MainMenu onCalendarClick={handleCalendarClick} onListsClick={handleListsClick} onDiaryClick={handleDiaryClick} onEmotionsClick={handleEmotionsClick} />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/lists' element={<Lists />} />
            <Route path='/diary' element={<Diary />} />
            <Route path='/emotions' element={<Emotions />} />
            <Route path='/invite' element={<Navigate to='/home' />} />
            <Route path='/set-date-start' element={<Navigate to='/home' />} />
          </>
        )}
      </Routes>
    </>
  )
}

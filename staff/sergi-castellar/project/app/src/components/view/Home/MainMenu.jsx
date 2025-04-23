import { useState, useEffect } from 'react'

import { logic } from '../../../logic'
import { useContext } from '../../../context'

export function MainMenu({ onCalendarClick, onListsClick, onDiaryClick, onEmotionsClick }) {
  const { alert } = useContext()
  const [user, setUser] = useState(null)
  const [daysTogether, setDaysTogether] = useState(0)
  const [partnerName, setPartnerName] = useState('')

  useEffect(() => {
    try {
      logic
        .getCurrentUser()
        .then((user) => setUser(user))
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }, [])

  useEffect(() => {
    try {
      logic
        .getCoupleInfo()
        .then((status) => {
          const { partnerName, daysInRelationship } = status
          setDaysTogether(daysInRelationship)
          setPartnerName(partnerName)
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

  const handleCalendarClick = () => onCalendarClick()
  const handleListsClick = () => onListsClick()
  const handleDiaryClick = () => onDiaryClick()
  const handleEmotionsClick = () => onEmotionsClick()

  return (
    <div className='bg-pink-100 min-h-screen flex flex-col items-center justify-start space-y-4'>
      <h2 className='text-3xl font-bold text-center text-gray-800'>Welcome again, {user ? user.username : ''}</h2>
      <div className='text-center bg-white p-4 rounded-3xl shadow-lg max-w-md mx-auto'>
        <div className='flex justify-center items-center space-x-2'>
          <img className='h-10' src='src/assets/home/asset_handing_hearts.png' alt='Handing hearts' />
          <p className='text-xl font-medium text-gray-800'>
            It’s been <span className='font-bold text-gray-900'>{daysTogether}</span> days since <span className='font-bold text-gray-900'>{partnerName}</span> and you met
          </p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6 px-6 py-4'>
        <a onClick={handleCalendarClick} className='flex flex-col items-center text-center bg-white p-4 rounded-2xl shadow-lg hover:bg-pink-200'>
          <img className='h-24' src='src/assets/home/asset_calendar.png' alt='Calendar' />
          <span className='text-lg font-medium text-gray-700 mt-2'>CALENDAR</span>
        </a>
        <a onClick={handleListsClick} className='flex flex-col items-center text-center bg-white p-4 rounded-2xl shadow-lg hover:bg-pink-200'>
          <img className='h-24' src='src/assets/home/asset_list.png' alt='Lists' />
          <span className='text-lg font-medium text-gray-700 mt-2'>LISTS</span>
        </a>
        <a onClick={handleDiaryClick} className='flex flex-col items-center text-center bg-white p-4 rounded-2xl shadow-lg hover:bg-pink-200'>
          <img className='h-24' src='src/assets/home/asset_diary.png' alt='Diary' />
          <span className='text-lg font-medium text-gray-700 mt-2'>DIARY</span>
        </a>
        <a onClick={handleEmotionsClick} className='flex flex-col items-center text-center bg-white p-4 rounded-2xl shadow-lg hover:bg-pink-200'>
          <img className='h-24' src='src/assets/home/asset_emotions.png' alt='Emotions' />
          <span className='text-lg font-medium text-gray-700 mt-2'>EMOTIONS</span>
        </a>
      </div>
    </div>
  )
}

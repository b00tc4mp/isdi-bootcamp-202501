import { useEffect, useState } from 'react'
import { logic } from '../logic'

export function EmotionsResult({ userEmotion, onBack }) {
  const [partnerEmotion, setPartnerEmotion] = useState(null)

  useEffect(() => {
    logic
      .retrieveTodayEmotions()
      .then(({ userEmotion: _userEmotion, partnerEmotion: _partnerEmotion }) => {
        if (_userEmotion !== null && _userEmotion !== userEmotion) userEmotion = _userEmotion
        setPartnerEmotion(_partnerEmotion ?? null)
      })
      .catch((error) => {
        console.error(error)

        alert(error.message)
      })
  }, [])

  return (
    <div className='min-h-screen bg-pink-100 p-6'>
      <div className='max-w-md mx-auto space-y-6'>
        <div className='flex items-center space-x-4'>
          <button onClick={onBack || (() => history.back())} className='bg-white w-10 h-10 rounded-xl shadow text-xl'>
            ←
          </button>
          <h1 className='text-xl font-bold'>EMOTIONS</h1>
        </div>

        <div className='bg-white p-4 rounded-2xl shadow text-center space-y-4'>
          <h2 className='text-lg font-semibold'>How are you feeling today?</h2>

          <div className='flex justify-center gap-8 pb-4'>
            <div className='w-40 bg-pink-200/40 rounded-2xl shadow p-2 flex flex-col items-center space-y-2'>
              <img src={`src/assets/emotions/asset_emotion_${userEmotion}.png`} alt='' className='w-20 h-20 object-contain' />
              <p className='text-sm font-medium'>Your emotions</p>
            </div>

            <div className='w-40 bg-pink-200/40 rounded-2xl shadow p-2 flex flex-col items-center space-y-2'>
              {partnerEmotion !== null ? <img src={`src/assets/emotions/asset_emotion_${partnerEmotion}.png`} alt='' className='w-20 h-20 object-contain' /> : <img src='src/assets/emotions/asset_emotion_default.png' alt='' className='w-20 h-20 object-contain opacity-50' />}
              <p className='text-sm font-medium'>Partner’s emotions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { logic } from '../../logic/feelings'

export function FeelingsResult({ userEmotion, onBack }) {
  const [partnerEmotion, setPartnerEmotion] = useState(null)

  useEffect(() => {
    logic
      .retrieveTodayFeelings()
      .then(({ user, partner }) => {
        setPartnerEmotion(partner ?? null)
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
          <h1 className='text-xl font-bold'>FEELINGS</h1>
        </div>

        <div className='bg-pink-200 p-4 rounded-2xl shadow text-center space-y-4'>
          <h2 className='text-lg font-semibold'>How are you feeling today?</h2>

          <div className='flex justify-center gap-8'>
            {/* Tu emoción */}
            <div className='flex flex-col items-center space-y-2'>
              <img src={`/assets/feelings/asset_emotion_${userEmotion}.png`} alt='' className='w-20 h-20 object-contain' />
              <p className='text-sm font-medium'>Your feelings</p>
            </div>

            {/* Emoción de la pareja */}
            <div className='flex flex-col items-center space-y-2'>
              {partnerEmotion !== null ? <img src={`/emotions/emotion-${partnerEmotion}.png`} alt='' className='w-20 h-20 object-contain' /> : <img src='/emotions/unknown.png' alt='' className='w-20 h-20 object-contain opacity-40' />}
              <p className='text-sm font-medium'>Partner’s feelings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { logic } from '../../logic'
import { FeelingsResult } from './FeelingsResult'

export function Feelings() {
  const [selectedEmotion, setSelectedEmotion] = useState(null)

  const handleSelect = (index) => {
    logic.feelings
      .createEmotion(index)
      .then(() => setSelectedEmotion(index))
      .catch((error) => {
        console.error(error)

        alert(error.message)
      })
  }

  if (selectedEmotion !== null) return <FeelingsResult userEmotion={selectedEmotion} />

  return (
    <div className='min-h-screen bg-pink-100 p-6'>
      <div className='max-w-md mx-auto space-y-6'>
        <div className='flex items-center space-x-4'>
          <button onClick={() => history.back()} className='bg-white w-10 h-10 rounded-xl shadow text-xl'>
            ←
          </button>
          <h1 className='text-xl font-bold'>FEELINGS</h1>
        </div>

        <div className='bg-pink-200 p-4 rounded-2xl shadow'>
          <h2 className='text-lg font-semibold mb-4 text-center'>How are you feeling today?</h2>

          <div className='grid grid-cols-3 gap-4'>
            {[...Array(9)].map((_, index) => (
              <button key={index} onClick={() => handleSelect(index)} className='bg-white/20 rounded-2xl shadow p-2 transition hover:scale-105 flex justify-center'>
                <img src={`/assets/feelings/asset_emotion_${index}.png`} alt='' className='w-16 h-16 object-contain' />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

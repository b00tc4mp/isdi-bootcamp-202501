import { useState, useEffect } from 'react'

export const EndLevelScreen = ({ isPassed, onReplay, onContinue, onCancelled }) => {
  const [isLevelPassed, setIsLevelPassed] = useState(null)

  useEffect(() => setIsLevelPassed(isPassed), [])

  const handleCloseClick = () => onCancelled()
  const handleContinueClick = () => onContinue()
  const handleReplayClick = () => onReplay()

  console.debug('EndLevelScreen -> render')

  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-b from-periwinkle to-mauve text-purple-800 p-6'>
      <div className='bg-white bg-opacity-90 border border-purple-200 shadow-lg rounded-xl p-6 w-full max-w-md text-center space-y-4'>
        <div className='flex justify-end'>
          <button onClick={handleCloseClick} className='text-purple-400 hover:text-purple-600 text-lg'>
            ❌
          </button>
        </div>

        <h1 className='text-3xl font-bold'>{isLevelPassed ? 'Congratulations!' : 'Oh no, this time you lose!'}</h1>

        <p className='text-5xl'>{isLevelPassed ? '🥳' : '😭'}</p>

        <div className='flex flex-col sm:flex-row justify-center gap-4 mt-4'>
          <button onClick={isLevelPassed ? handleContinueClick : handleReplayClick} className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition'>
            {isLevelPassed ? 'Continue' : 'Replay'}
          </button>
        </div>
      </div>
    </div>
  )
}

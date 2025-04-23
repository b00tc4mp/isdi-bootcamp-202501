import { useState, useEffect } from 'react'
import { useContext } from '../context'
import { EndLevelScreen } from './EndLevelScreen'

import { logic } from '../logic'

export function Level({ level, currentState, onCancelled }) {
  const { alert } = useContext()

  const [currentLevel, setCurrentLevel] = useState(level)
  const [userCurrentLevel, setUserCurrentLevel] = useState(null)
  const [view, setView] = useState(currentState ? currentState : 'inGame')
  const [type, setType] = useState(level.type)
  const [showEndLevel, setShowEndLevel] = useState(false)
  const [levelIsPassed, setLevelIsPassed] = useState(false)

  useEffect(() => {
    try {
      logic
        .getCurrentLevel()
        .then((currentLevel) => {
          setUserCurrentLevel(currentLevel)
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

  const handleLevelClick = () => setView('opened')
  const handlePlayClick = () => setView('inGame')
  const handleCancelClick = () => onCancelled()

  const handleQuizResponseClick = (event) => {
    event.preventDefault()

    try {
      const form = event.target
      const selector = form.querySelector('input[name="userAnswer"]:checked')
      const userAnswer = selector?.value

      logic
        .isLevelPassed(currentLevel.id, userAnswer)
        .then((isPassed) => {
          form.reset()
          setLevelIsPassed(isPassed)
          setShowEndLevel(true)
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleFillInBlankResponseClick = (event) => {
    event.preventDefault()

    try {
      const form = event.target
      const {
        userAnswer: { value: userAnswer },
      } = form

      logic
        .isLevelPassed(currentLevel.id, userAnswer)
        .then((isPassed) => {
          form.reset()
          setLevelIsPassed(isPassed)
          setShowEndLevel(true)
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleReplayLevel = () => {
    setShowEndLevel(false)
    setView('inGame')
  }

  const handleContinueGame = () => {
    try {
      logic
        .getCurrentLevel()
        .then((currentLevel) => {
          setCurrentLevel(currentLevel)
          setShowEndLevel(false)
          setView('opened')
          setType(currentLevel.type)
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleCloseClick = () => onCancelled()

  console.debug('Level -> render')

  return (
    <div className='flex justify-center '>
      {showEndLevel ? (
        <EndLevelScreen isPassed={levelIsPassed} onReplay={handleReplayLevel} onContinue={handleContinueGame} onCancelled={handleCloseClick} />
      ) : view === 'closed' ? (
        <button
          onClick={handleLevelClick}
          className={`w-11/12 flex justify-center gap-2 font-semibold transition 
    py-3 px-4 rounded-lg shadow-md mt
    ${currentLevel.isBlocked ? 'bg-gray-300 text-purple-900 border border-purple-200' : userCurrentLevel ? (userCurrentLevel.id === currentLevel.id ? 'bg-green-400 text-white hover:bg-green-500' : 'bg-green-100') : ''}`}
        >
          <span>{currentLevel.isBlocked ? '🔒' : userCurrentLevel ? (currentLevel.id === userCurrentLevel.id ? '' : '✔') : ''}</span>
          <span>{currentLevel.name}</span>
        </button>
      ) : view === 'opened' ? (
        <section className='flex flex-col items-center bg-white/75 rounded-xl p-4 shadow-md transition-all'>
          <div className='w-full  p-4 sm:p-10 min-h-[100px] text-center '>
            <h2 className='text-2xl font-extrabold text-purple-800 mb-4 drop-shadow-sm'>{currentLevel.name}</h2>
            <p className='text-purple-700 text-md whitespace-pre-line px-4'>{currentLevel.description}</p>
          </div>

          <div className='mt-6 flex gap-15'>
            {currentLevel.isBlocked ? (
              <button className='bg-gray-500 text-gray-100 font-medium py-2 px-6 rounded-lg cursor-not-allowed shadow' disabled>
                Play 🔒
              </button>
            ) : (
              <button className='bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-full shadow transition' onClick={handlePlayClick}>
                Play
              </button>
            )}

            <button onClick={handleCancelClick} className='text-md text-gray-600 hover:text-purple-700 underline mt-2'>
              Cancel
            </button>
          </div>
        </section>
      ) : view === 'inGame' ? (
        <section className='mt-2 space-y-4  bg-white bg-opacity-90  rounded-xl p-4 shadow-md transition-all mb-2'>
          <h3 className='text-xl font-bold text-purple-800'>{currentLevel.name}</h3>

          <p className='text-purple-600 text-md'>{currentLevel.description}</p>

          <div className='bg-purple-50 border border-purple-400 rounded-lg p-4 shadow-inner'>
            <p className='text-purple-900 font-medium whitespace-pre-line'>{currentLevel.body}</p>
          </div>

          {type === 'quiz' && (
            <form onSubmit={handleQuizResponseClick} className='space-y-2 mt-2'>
              {currentLevel.resultOptions.map((option, i) => (
                <div key={i} className='flex items-center gap-2'>
                  <input type='radio' id={option} name='userAnswer' value={option} className='accent-purple-500' />
                  <label htmlFor={option} className='text-purple-700'>
                    {option}
                  </label>
                </div>
              ))}

              <button type='submit' className='mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full'>
                Submit
              </button>
            </form>
          )}

          {type === 'fillInBlank' && (
            <form onSubmit={handleFillInBlankResponseClick} className='space-y-2 mt-2'>
              <div>
                <label htmlFor='userAnswer' className='text-purple-700 block mb-1'>
                  Write your answer
                </label>
                <input type='text' id='userAnswer' className='w-full p-2 rounded-md bg-purple-50 border border-purple-400 focus:outline-none focus:ring-2 focus:ring-mauve' />
              </div>

              <button type='submit' className='bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full'>
                Submit
              </button>
            </form>
          )}
        </section>
      ) : null}
    </div>
  )
}

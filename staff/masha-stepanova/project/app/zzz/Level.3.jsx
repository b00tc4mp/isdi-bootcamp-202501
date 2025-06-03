import { useState, useEffect } from 'react'
import { useContext } from '../context'
import { EndLevelScreen } from '../view/EndLevelScreen'

import { logic } from '../logic'

export function Level({ level, currentState, onCancelled }) {
  const { alert } = useContext()

  const [currentLevel, setCurrentLevel] = useState(null)
  const [userCurrentLevel, setUserCurrentLevel] = useState(null)
  const [view, setView] = useState('')
  const [type, setType] = useState('')
  const [showEndLevel, setShowEndLevel] = useState(false)
  const [levelIsPassed, setLevelIsPassed] = useState(false)

  useEffect(() => {
    try {
      setCurrentLevel(currentLevel ? currentLevel : level)
      setView(currentState ? currentState : 'inGame')
      setType(level.type)

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

      logic.isLevelPassed(currentLevel.id, userAnswer).then((isPassed) => {
        form.reset()
        setLevelIsPassed(isPassed)
        setShowEndLevel(true)
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
      logic.getCurrentLevel().then((currentLevel) => {
        setCurrentLevel(currentLevel)
        setShowEndLevel(false)
        setView('inGame')
        setType(currentLevel.type)
      })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleCloseClick = () => onCancelled()

  return (
    <div className='bg-white bg-opacity-90  rounded-xl p-4 shadow-md transition-all'>
      {showEndLevel ? (
        <EndLevelScreen level={currentLevel} isPassed={levelIsPassed} onReplay={handleReplayLevel} onContinue={handleContinueGame} onCancelled={handleCloseClick} />
      ) : view === 'closed' ? (
        <button
          onClick={handleLevelClick}
          className={`w-full flex items-center justify-start gap-2 font-semibold transition 
    py-3 px-4 rounded-lg shadow 
    ${currentLevel.isBlocked ? 'bg-gray-300 text-purple-900 border border-purple-200' : userCurrentLevel ? (userCurrentLevel.id === currentLevel.id ? 'bg-green-400 text-white hover:bg-green-500' : 'bg-green-100') : ''}`}
        >
          <span>{currentLevel.isBlocked ? '🔒' : userCurrentLevel ? (currentLevel.id === userCurrentLevel.id ? '' : '✔') : ''}</span>
          <span>{currentLevel.name}</span>
        </button>
      ) : view === 'opened' ? (
        <section>
          <h2 className='text-xl font-bold text-purple-800'>{currentLevel.name}</h2>
          <p className='text-sm text-purple-600 mb-2'>{currentLevel.description}</p>

          {currentLevel.isBlocked ? (
            <button className='bg-gray-300 text-gray-600 font-medium py-1 px-4 rounded-lg cursor-not-allowed'>Play 🔒</button>
          ) : (
            <button className='bg-green-400 hover:bg-purple-400 text-white font-bold py-1 px-4 rounded-lg' onClick={handlePlayClick}>
              Play
            </button>
          )}

          <button onClick={handleCancelClick} className='ml-4 text-sm text-purple-400 hover:text-purple-600 underline'>
            Cancel
          </button>
        </section>
      ) : view === 'inGame' ? (
        <section className='mt-2 space-y-2'>
          <h3 className='text-lg font-bold text-purple-800'>{currentLevel.name}</h3>
          <p className='text-purple-600'>{currentLevel.description}</p>
          <p className='text-purple-700 italic whitespace-pre-line'>{currentLevel.body}</p>

          {type === 'quiz' && (
            <form onSubmit={handleQuizResponseClick} className='space-y-2 mt-2'>
              {currentLevel.resultOptions.map((option, i) => (
                <div key={i} className='flex items-center gap-2'>
                  <input type='radio' id={option} name='userAnswer' value={option} className='accent-mauve' />
                  <label htmlFor={option} className='text-purple-700'>
                    {option}
                  </label>
                </div>
              ))}

              <button type='submit' className='bg-purple-500 hover:bg-purple-600 text-white py-1 px-4 rounded-full'>
                Submit
              </button>
            </form>
          )}

          {type === 'fillInBlank' && (
            <form onSubmit={handleFillInBlankResponseClick} className='space-y-2 mt-2'>
              {
                <div>
                  <label htmlFor='userAnswer'>Write here your answer</label>
                  <input type='text' id='userAnswer' className='w-full mt-1 p-1 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-mauve' />
                </div>
              }

              <button type='submit' className='bg-purple-500 hover:bg-purple-600 text-white py-1 px-4 rounded-full'>
                Sumbit
              </button>
            </form>
          )}
        </section>
      ) : null}
    </div>
  )
}

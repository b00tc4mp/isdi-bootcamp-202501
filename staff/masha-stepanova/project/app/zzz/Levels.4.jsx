import { useEffect, useState } from 'react'
import { Level } from '../view/Level'
import { logic } from '../logic'
import { useContext } from '../context'
import { useScrollToElement } from '../util/useScrollToElement'

export function Levels({ onLevelSelected }) {
  const { alert } = useContext()
  const [levels, setLevels] = useState([])
  const [currentLevelId, setCurrentLevelId] = useState(null)

  useEffect(() => {
    logic
      .getCurrentLevel()
      .then((level) => setCurrentLevelId(level.id))
      .catch(console.error)
  }, [])

  useEffect(() => {
    logic
      .getLevels()
      .then(setLevels)
      .catch((error) => {
        console.error(error)

        alert(error.message)
      })
  }, [])

  const scrollRef = useScrollToElement(currentLevelId)

  return (
    <section className='bg-periwinkle bg-opacity-40 rounded-xl p-4 shadow-inner border border-mauve'>
      <h2 className='text-xl font-bold text-purple-800 text-center mb-4'>🗺️ Mapa de Aventuras</h2>

      {/* <div className='max-h-[400px] overflow-y-auto py-4 px-2 space-y-4 scroll-smooth snap-y snap-mandatory'>
        {levels.map((level) => (
          <div key={level.id} ref={level.id === currentLevelId ? scrollRef : null} onClick={() => onLevelSelected(level)} className='cursor-pointer snap-start'>
            <Level level={level} currentState='closed' />
          </div>
        ))}
      </div> */}

      <div className='max-h-[300px] overflow-y-auto py-4 px-2 space-y-4 scroll-smooth snap-y snap-mandatory'>
        {levels.map((level, index) => (
          <div key={level.id} className='relative flex flex-col items-center group'>
            {index !== 0 && (
              <div className='h-8 w-1 bg-purple-300'></div> // camino entre nodos
            )}
            <div
              ref={level.id === currentLevelId ? scrollRef : null}
              onClick={() => onLevelSelected(level)}
              className={`relative z-10 cursor-pointer flex items-center justify-center w-20 h-20 rounded-full text-center text-sm font-bold shadow-lg transition 
            ${level.isBlocked ? 'bg-gray-300 text-gray-600' : currentLevelId === level.id ? 'bg-green-400 text-white animate-pulse' : 'bg-purple-200 text-purple-800 hover:bg-purple-300'}
          `}
            >
              {level.isBlocked ? '🔒' : currentLevelId === level.id ? '⭐' : '📜'}
            </div>
            <span className='mt-2 text-xs text-purple-700'>{level.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

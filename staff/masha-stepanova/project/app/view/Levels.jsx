import { useEffect, useState } from 'react'
import { Level } from './Level'
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
    <section className=' bg-white/75 bg-opacity-80 rounded-xl p-4 shadow-md'>
      <h2 className='text-lg font-bold mb-4'>🗺️ Levels map</h2>
      <div className='grid gap-4 max-h-[300px] overflow-y-auto py-2'>
        {levels.map((level) => (
          <div key={level.id} ref={level.id === currentLevelId ? scrollRef : null} onClick={() => onLevelSelected(level)} className='cursor-pointer'>
            <Level level={level} currentState={'closed'} />
          </div>
        ))}
      </div>
    </section>
  )
}

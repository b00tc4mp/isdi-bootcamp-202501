import { useEffect, useState } from 'react'
import { Level } from '../view/Level'
import { logic } from '../logic'
import { useContext } from '../context'

export function Levels({ onLevelSelected }) {
  const { alert } = useContext()
  const [levels, setLevels] = useState([])

  useEffect(() => {
    logic
      .getLevels()
      .then(setLevels)
      .catch((error) => {
        console.error(error)

        alert(error.message)
      })
  }, [])

  return (
    <section className='bg-white bg-opacity-80 rounded-xl p-4 shadow-md'>
      <div className='grid gap-4 max-h-[400px] overflow-y-auto py-2'>
        {levels.map((level) => (
          <div key={level.id} onClick={() => onLevelSelected(level)} className='cursor-pointer'>
            <Level level={level} currentState={'closed'} />
          </div>
        ))}
      </div>
    </section>
  )
}

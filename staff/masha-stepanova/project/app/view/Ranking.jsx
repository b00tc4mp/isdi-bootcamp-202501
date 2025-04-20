import { useState, useEffect } from 'react'
import { useContext } from '../context'
import { useScrollToElement } from '../util/useScrollToElement'
import { logic } from '../logic'

export function Ranking({ currentState, username }) {
  const { alert } = useContext()

  const [state, setState] = useState('')
  const [userRanking, setUserRanking] = useState('')
  const [globalRanking, setGlobalRanking] = useState([])

  useEffect(() => {
    try {
      Promise.all([logic.getUserRanking(), logic.getGlobalRanking()])
        .then(([position, ranking]) => {
          setUserRanking(position)
          setGlobalRanking(ranking)
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })

      setState(currentState)
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }, [])

  const handleRankingClick = () => {
    let newState = state === 'closed' ? 'opened' : 'closed'
    setState(newState)
  }
  const userRef = useScrollToElement(globalRanking.length > 0)

  const handleCloseClick = () => setState('closed')

  console.debug('Ranking -> render')

  return (
    <>
      <section className='bg-white bg-opacity-80 rounded-xl p-4 shadow-md mb-4 grid gap-4 '>
        <h2 onClick={handleRankingClick} className='text-lg font-bold mb-2'>
          🏆 Ranking
        </h2>
        {state === 'closed' && (
          <section onClick={handleRankingClick} className='max-h-[150px] overflow-y-auto'>
            <div>
              <h2 className={userRanking.username === username ? 'font-bold' : ''}>
                # {userRanking.position} {userRanking.username}
              </h2>
            </div>
          </section>
        )}

        {state === 'opened' && (
          <section className='max-h-[150px] overflow-y-auto'>
            <div>
              {globalRanking.map((user) => (
                <p key={user.username} ref={user.username === userRanking.username ? userRef : null} className={user.username === username ? 'font-bold' : ''}>
                  #{user.position}: {user.username}
                </p>
              ))}
            </div>
          </section>
        )}
      </section>
    </>
  )
}

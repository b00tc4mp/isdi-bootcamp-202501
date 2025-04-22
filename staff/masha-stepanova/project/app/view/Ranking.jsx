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
      <section className='bg-white/80 rounded-xl p-4 shadow-md mb-4 grid gap-4 '>
        <h2 onClick={handleRankingClick} className='text-lg font-bold mb-2'>
          🏆 Ranking
        </h2>
        {state === 'closed' && (
          <section onClick={handleRankingClick} className='max-h-[150px] overflow-y-auto'>
            <div className='bg-purple-100 p-2 rounded-lg shadow-md'>
              <h2 className={userRanking.username === username ? 'font-bold' : ''}>
                #{userRanking.position}: {userRanking.username}, {userRanking.score} pt
              </h2>
            </div>
          </section>
        )}

        {state === 'opened' && (
          <section className='max-h-[150px] overflow-y-auto'>
            <div>
              {globalRanking.map((user) => (
                <p key={user.username} ref={user.username === userRanking.username ? userRef : null} className={user.username === username ? 'font-bold bg-purple-100 p-2 rounded-lg mb-2 shadow-md' : 'bg-purple-100 p-2 rounded-lg mb-2 shadow-md'}>
                  #{user.position}: {user.username}, {user.score} pt
                </p>
              ))}
            </div>
          </section>
        )}
      </section>
    </>
  )
}

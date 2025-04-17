import { useState, useEffect } from 'react'
import { useContext } from '../context'
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
          console.log(userRanking, globalRanking)
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
  const handleCloseClick = () => setState('closed')

  console.debug('Ranking -> render')

  return (
    <>
      <section className='bg-white bg-opacity-80 rounded-xl p-4 shadow-md mb-4'>
        <h2 onClick={handleRankingClick} className='text-lg font-bold mb-2'>
          🏆 Ranking
        </h2>
        {state === 'closed' && (
          <section onClick={handleRankingClick}>
            <div>
              <h2>
                # {userRanking.position} {userRanking.username}{' '}
              </h2>
            </div>
          </section>
        )}

        {state === 'opened' && (
          <section>
            <div>
              {globalRanking.map((user) => (
                <p key={user.username}>
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

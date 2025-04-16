import { useState, useEffect } from 'react'
import { useContext } from '../context'
import { logic } from '../logic'

export function Ranking({ currentState, username }) {
    const { alert } = useContext()

    const [state, setState] = useState('')
    const [userPosition, setUserPosition] = useState('')
    const [globalRanking, setGlobalRanking] = useState(null)

    useEffect(() => {
        try {
            setState(state)

            //TODO logic.getUserRankingPosition and make it string
            logic.getUserRankingPosition()
                .then(position => setUserPosition(position))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

            // TODO logic.getGlobalRanking and make it array of objects {position, username}
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])



    return <>Hello, Ranking!
        {state === 'closed' && <section>
            <div>
                <h2># {userPosition} on global ranking</h2>
            </div>
        </section>}

        {state === 'opened' && <section>
            <div>
                {globalRanking.map(user => {
                    <p>#{user.position}: {username}</p>
                })}
            </div>
        </section>}
    </>
}
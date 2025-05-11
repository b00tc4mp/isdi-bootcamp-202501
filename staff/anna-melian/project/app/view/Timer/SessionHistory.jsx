import { useState, useEffect } from 'react'

import { Timer } from './Timer.jsx'

import { logic } from '../../logic'
import { useContext } from '../../context'

export function SessionHistory({ onMenuTimerClick, onUserLoggedOut }) {
    const { alert, confirm } = useContext()
    const [timers, setTimers] = useState([])
    const [gems, setGems] = useState('')
    const [isMenuVisible, setMenuVisible] = useState(false)

    useEffect(() => {
        console.debug('timers -> useEffect')
        try {
            logic.getUserGems()
                .then(gems => setGems(gems))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
            loadtimers()

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible)
    }

    const handleMenuSessionHistoryClick = () => {
        setMenuVisible(!isMenuVisible)
    }

    const handleMenuTimerClick = () => {
        onMenuTimerClick()
    }

    const handleLogoutClick = () => {
        confirm('Logout?')
            .then(accepted => {
                if (accepted) {
                    try {
                        logic.logoutUser()
                        onUserLoggedOut()


                    } catch (error) {
                        console.error(error)
                        alert(error.message)
                    }
                }
            })

    }

    const loadtimers = () => {
        try {
            logic.getTimers()
                .then(timers => setTimers(timers))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    console.debug('Timers -> render')

    return <>
        <header className="flex justify-between items-center px-4 py-5 text-yellow-600 bg-fuchsia-950 pl-0">

            <nav className='relative pl-4'>
                <button className='burgerMenu' onClick={toggleMenu}>☰</button>
                {isMenuVisible && (
                    <ul className='absolute top-full left-0 z-50 flex flex-col p-4 space-y-3 w-[180px] min-h-screen bg-fuchsia-950'>
                        <li className='font-bold cursor-pointer' onClick={handleMenuTimerClick}>Timer</li>
                        <li className='font-bold cursor-pointer' onClick={handleMenuSessionHistoryClick}>Session History</li>
                        <span></span>
                        <span></span>
                        <li className='mt-auto mb-5'>
                            <button type="button" onClick={handleLogoutClick} className='bg-red-900 w-[130px] h-[30px] rounded'>Logout</button>
                        </li>
                    </ul>
                )}
            </nav>


            <h3 className='absolute left-1/2 transform -translate-x-1/2 font-bold text-2xl'>Session History</h3>

            <div className='bg-gray-50 flex space-x-2 text-neutral-950 w-[50px] py-0.5 px-1.5 '>
                <p>{gems}</p>
                <p className=''>💎</p>
            </div>

        </header>

        <main className={`flex flex-col items-center justify-center space-y-4 ${isMenuVisible ? 'pointer-events-none opacity-60' : ''}`}>
            <section className=''>
                {timers.map(timer => <Timer key={timer.id} timer={timer} />)}
            </section>

        </main>

    </>

}
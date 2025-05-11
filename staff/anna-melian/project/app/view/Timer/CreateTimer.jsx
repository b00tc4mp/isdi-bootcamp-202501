import { useState, useEffect } from 'react'
import { logic } from '../../logic/index.js'
import { useContext } from '../../context.js'



export function CreateTimer({ onUserLoggedOut, onCreateTimer, onSessionHistoryClick }) {
    const { alert, confirm } = useContext()

    const [time, setTime] = useState(60)
    const [pauseTime, setPauseTime] = useState(2)
    const [tag, setTag] = useState('')
    const [gems, setGems] = useState('')
    const [isMenuVisible, setMenuVisible] = useState(false)


    useEffect(() => {
        console.debug('CreateTimer -> useEffect')

        try {
            logic.getUserGems()
                .then(gems => setGems(gems))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible)
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



    const handleCreateClick = () => {
        try {
            logic.createTimer(time, pauseTime, tag)
                .then(timerId => {
                    onCreateTimer(timerId)
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }

    const handleMenuTimerClick = () => {
        setMenuVisible(!isMenuVisible)
    }

    const handleMenuSessionHistoryClick = () => {
        onSessionHistoryClick()
    }

    console.debug('CreateTimer -> render')

    return (
        <>
            <header className="flex justify-between items-center px-4 py-5 text-yellow-600 bg-fuchsia-950 pl-0">

                <nav className='relative pl-4'>
                    <button className='burgerMenu text-2xl w-10 h-10' onClick={toggleMenu}>☰</button>
                    {isMenuVisible && (
                        <ul className='absolute top-full left-0 z-50 flex flex-col p-4 space-y-3 w-[180px] min-h-screen bg-fuchsia-950'>
                            <li className='font-bold cursor-pointer' onClick={handleMenuTimerClick}>Timer</li>
                            <li className='font-bold cursor-pointer' onClick={handleMenuSessionHistoryClick}>Session History</li>
                            <span></span>
                            <span></span>
                            <li className='mt-auto mb-5'>
                                <button type="button" onClick={handleLogoutClick} className='bg-red-900 w-[130px] h-[30px]'>Logout</button>
                            </li>
                        </ul>
                    )}
                </nav>


                <h3 className='absolute left-1/2 transform -translate-x-1/2 font-bold text-2xl'>Timer</h3>

                <div className='bg-gray-50 flex space-x-2 text-neutral-950 w-[50px] py-0.5 px-1.5 '>
                    <p>{gems}</p>
                    <p className=''>💎</p>
                </div>

            </header>

            <main className={`flex flex-col items-center justify-center px-8 py-8 space-y-8 ${isMenuVisible ? 'pointer-events-none opacity-50' : ''}`}>
                <h2 className="text-3xl font-extrabold text-fuchsia-900">Create Your Timer ⏳</h2>

                <div className="text-4xl font-bold text-yellow-600">{time} min</div>

                <input
                    type="range"
                    className="w-full max-w-md accent-fuchsia-700"
                    min={5}
                    max={120}
                    step={5}
                    value={time}
                    onChange={e => setTime(parseInt(e.target.value))}
                />

                <div className="flex items-center space-x-4">
                    <label htmlFor="pause" className="text-xl font-medium text-fuchsia-800">Pause Time:</label>
                    <input
                        id="pause"
                        type="number"
                        min={2}
                        max={10}
                        value={pauseTime}
                        onChange={e => setPauseTime(Number(e.target.value))}
                        className="w-16 text-center border-2 border-fuchsia-300 rounded px-2 py-1 text-base"
                    />
                    <span className="text-lg text-gray-600">min</span>
                </div>
                <p className="text-base text-gray-500 italic max-w-md">You can do a maximum of 8 pauses during the timer.          </p>

                <div className="flex items-center space-x-4">
                    <label htmlFor="tag" className="text-xl font-semibold text-fuchsia-800">Tag:</label>
                    <input
                        id="tag"
                        type="text"
                        value={tag}
                        onChange={e => setTag(e.target.value)}
                        className="w-30 text-[1rem] px-1 py-2 border-2 text-center border-fuchsia-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleCreateClick}
                    className="w-full max-w-md bg-fuchsia-900 hover:bg-fuchsia-800 text-white font-bold px-8 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                    ✨ Create Timer
                </button>
            </main>

        </>
    )

}

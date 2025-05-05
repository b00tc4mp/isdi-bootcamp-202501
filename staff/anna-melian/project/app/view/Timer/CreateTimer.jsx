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

            <main className={`flex flex-col items-center justify-center px-6 py-8 space-y-6 ${isMenuVisible ? 'pointer-events-none opacity-50' : ''}`}>
                <h2 className="text-2xl font-bold text-fuchsia-900">Create you timer ⏳</h2>

                <div className="text-3xl font-bold text-yellow-700">{time} min</div>

                <input
                    type="range"
                    className="w-full max-w-md accent-fuchsia-700"
                    min={5}
                    max={120}
                    step={5}
                    value={time}
                    onChange={e => setTime(parseInt(e.target.value))}
                />

                <div className="flex items-center space-x-3">
                    <label htmlFor="pause" className="text-lg font-medium text-fuchsia-800">Pause:</label>
                    <input
                        id="pause"
                        type="number"
                        min={2}
                        max={10}
                        value={pauseTime}
                        onChange={e => setPauseTime(Number(e.target.value))}
                        className="w-16 text-center border border-fuchsia-300 rounded px-1 py-0.5"
                    />
                    <span className="text-sm text-gray-600">min</span>
                </div>
                <p className="text-sm text-gray-500 italic">You have a maxiumum of 8 pauses</p>

                <div className="flex items-center space-x-3">
                    <label htmlFor="tag" className="text-lg font-semibold text-fuchsia-800">Tag:</label>
                    <input
                        id="tag"
                        type="text"
                        value={tag}
                        onChange={e => setTag(e.target.value)}
                        className="border border-fuchsia-300 rounded px-2 py-1"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleCreateClick}
                    className="bg-fuchsia-900 hover:bg-fuchsia-800 text-white font-bold py-2 px-6 rounded-lg shadow transition"
                >
                    ✨ Create Timer
                </button>
            </main>
        </>
    )

}

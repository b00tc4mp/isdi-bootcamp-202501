import { useState, useEffect } from 'react'
import { logic } from '../../logic/index.js'
import { useContext } from '../../context.js'

export function CreateTimer({ onUserLoggedOut, onCreateTimer }) {
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
        const accepted = confirm('Logout?')
        if (accepted) {
            logic.logoutUser()

            onUserLoggedOut()
        } else {
            console.error(error)

            alert(error.message)
        }
    }

    const handleTimeChange = (event) => {
        setTime(parseInt(event.target.value))
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

    console.debug('CreateTimer -> render')

    return <>
        <header className="flex justify-between items-center px-4 py-2 text-yellow-600 bg-fuchsia-950 pl-0">

            <nav className='relative pl-4'>
                <button className='burgerMenu' onClick={toggleMenu}>☰</button>
                {isMenuVisible && (
                    <ul className='absolute top-full left-0 z-50 flex flex-col p-4 space-y-3 w-[180px] min-h-screen bg-fuchsia-950'>
                        <li className='font-bold'>Timer</li>
                        <li className='font-bold'>Session History</li>
                        <span></span>
                        <span></span>
                        <li className='mt-auto mb-5'>
                            <button type="button" onClick={handleLogoutClick} className='bg-red-900 w-[130px] h-[30px]'>Logout</button>
                        </li>
                    </ul>
                )}
            </nav>


            <h3 className='font-bold'>Timer</h3>

            <div className='bg-gray-50 flex space-x-2 text-neutral-950 w-[100px] py-0.5 px-1.5 '>
                <p>{gems}</p>
                <p className=''>GEM</p>
            </div>

        </header>

        <main className={`flex flex-col items-center justify-center space-y-4 ${isMenuVisible ? 'pointer-events-none opacity-60' : ''}`}>
            <h3>Create a timer</h3>
            <h1>⏳ {time} min</h1>
            <input type="range" id='time' min={5} max={120} step={5} value={time} onChange={handleTimeChange} />
            <div>cuadro
            </div>
            <div className="flex items-center space-x-2">
                <h2>Pause</h2> <input type="number" id="pause" min={2} max={10} value={pauseTime} onChange={e => setPauseTime(Number(e.target.value))} /> <p>min</p>

            </div>
            <p>You have 8 pauses</p>

            <div className="flex items-center space-x-2">
                <h2 className="font-bold">Tag</h2> <input type="text" id='tag' value={tag}
                    onChange={e => setTag(e.target.value)} />
            </div>


            <button type='button' onClick={handleCreateClick}>Create</button>
        </main>
    </>

}

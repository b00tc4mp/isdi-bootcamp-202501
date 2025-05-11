import { useState } from 'react'
import { useNavigate } from 'react-router'

import { logic } from '../../logic'
import { useContext } from '../../context'

export function Timer({ timer }) {
    const { alert, confirm } = useContext()
    const [moreInfo, setMoreInfoView] = useState(false)

    const navigate = useNavigate()

    const handleTimerClick = () => {
        setMoreInfoView(!moreInfo)
    }

    const extraTimesTotal = Array.isArray(timer.extraTimes)
        ? timer.extraTimes.reduce((acc, curr) => acc + curr, 0)
        : 0


    const initialSetTime = timer.time

    let gems = (extraTimesTotal + initialSetTime)

    console.debug('timer -> render')

    return (
        <article
            className="bg-fuchsia-100 w-[700px] mb-4 px-6 py-5 rounded-2xl shadow-lg border-4 border-fuchsia-950 cursor-pointer transition-all duration-300 hover:shadow-xl"
            onClick={handleTimerClick}
        >
            {!moreInfo && <div className="flex justify-between items-center ">
                <h3 className="text-xl font-bold text-red-900 ">{timer.tag}</h3>


                <h1 className="text-2xl font-semibold text-fuchsia-950 text-center">
                    {timer.time} min
                </h1>

                <div className="text-xl font-semibold text-right">
                    {timer.status === 'end' && (
                        <span className="text-green-700">✔️ Finished</span>
                    )}
                    {timer.status === 'exit' && (
                        <span className="text-red-500">✖️ Not Completed</span>
                    )}
                </div>
            </div>}

            {moreInfo && (
                <div className=" rounded-xl  animate-fade-in text-fuchsia-950 space-y-6">

                    <div className="text-center space-y-1">
                        <h2 className="text-lg font-bold uppercase text-pink-700 tracking-wider">{timer.tag}</h2>
                        <p className="text-3xl font-extrabold text-fuchsia-900">{timer.time} min</p>
                        <p className="text-xl font-semibold">
                            {timer.status === 'end' && (
                                <span className="text-green-700">✔️ Finished</span>
                            )}
                            {timer.status === 'exit' && (
                                <span className="text-red-500">✖️ Not Completed</span>
                            )}
                        </p>
                    </div>


                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-m text-fuchsia-800">
                        <div className="grid grid-cols-2 gap-x-6">
                            <span className="font-semibold text-pink-500">⏸️ Pause Time:</span>
                            <span>{timer.pauseTime} min</span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-6">
                            <span className="font-semibold text-pink-500">📅 Start Date:</span>
                            <span>{new Date(timer.startDate).toLocaleDateString('en-US')}</span>
                        </div>

                        {timer.pausesCount > 0 && (
                            <div className="flex justify-start gap-x-12 col-span-1">
                                <span className="font-semibold text-pink-500">🔁 Number of Pauses:</span>
                                <span>{timer.pausesCount}</span>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-x-6">
                            <span className="font-semibold text-pink-500">Gems: </span>
                            {timer.status === 'end' && (
                                <span className='text-green-700' >+ {gems}</span>
                            )}
                            {timer.status === 'exit' && (
                                <span className='text-red-600' >- {gems} </span>
                            )}
                        </div>

                        {extraTimesTotal !== 0 && (
                            <div className="flex justify-start gap-x-12 col-span-1">
                                <span className="font-semibold text-pink-500">➕ Total Extra Time:</span>
                                <span>{extraTimesTotal} min</span>
                            </div>
                        )}


                    </div>
                </div>
            )}
        </article>
    )
}
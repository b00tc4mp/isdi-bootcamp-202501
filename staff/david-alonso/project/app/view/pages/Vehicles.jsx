import { useParams } from "react-router"
import { useEffect, useState } from 'react'
import { getVehicles } from '../../logic/getVehicles'
import { Link } from 'react-router'
import { DateTime } from 'luxon'
import { useVehicle } from "../../hooks/vehicle.hooks"

export const Vehicles = () => {
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { id } = useParams()
    const vehicle = useVehicle(id)

    useEffect(() => {
        getVehicles()
            .then(data => {

                setVehicles(data)
            })
            .catch(error => {
                console.error('Error al obtener vehículos:', error)
                setError(error.message)
            });
    }, []);


    // const nextITVDate = DateTime.fromISO(vehicle?.itv).plus({ year: 1 })
    // const timeToNextITV = nextITVDate.diff(DateTime.now().startOf('day'), ['months', 'days']).toObject()

    // let nextITVSentence = ''
    // if (timeToNextITV.months >= 1) {
    //     nextITVSentence =
    //         <div className={`p-1 pl-3 mb-5 rounded-md`} >
    //             <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
    //             <p>Dentro de {timeToNextITV.months} {Math.floor(timeToNextITV.months) <= 1 ? 'mes' : 'meses'}</p>
    //         </div>
    // } else if (timeToNextITV.months >= 0 && timeToNextITV.months < 1) {
    //     const showAlert = timeToNextITV.days < 7
    //     if (timeToNextITV.days >= 1) {
    //         nextITVSentence =
    //             <div className={`p-1 pl-3 mb-5 rounded-md ${showAlert ? "bg-red-500 " : "bg-amber-500 "}`} >
    //                 <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
    //                 <p>Dentro de {Math.floor(timeToNextITV.days)} {Math.floor(timeToNextITV.days) <= 1 ? 'día' : 'días'} {showAlert && '⚠️'}</p>
    //             </div>


    //     } else if (timeToNextITV.days >= 0 && timeToNextITV.days < 1) {
    //         nextITVSentence =
    //             <div className={`p-1 pl-3 mb-5 rounded-md bg-red-500 `} >
    //                 <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
    //                 <p>Hoy {showAlert && '⚠️'}</p>
    //             </div>

    //     } else {
    //         nextITVSentence =
    //             <div className={`p-1 pl-3 mb-5 rounded-md bg-red-500`} >
    //                 <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
    //                 <p>Hace {Math.abs(Math.floor(timeToNextITV.days))} {Math.abs(Math.floor(timeToNextITV.days)) <= 1 ? 'día' : 'días'} ⚠️</p>
    //             </div>

    //     }
    // } else {
    //     nextITVSentence =
    //         <div className={`p-1 pl-3 mb-5 rounded-md bg-red-500`} >
    //             <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
    //             <p>Hace {Math.abs(Math.floor(timeToNextITV.months))} {Math.abs(Math.floor(timeToNextITV.months)) <= 1 ? 'mes' : 'meses'} ⚠️</p>
    //         </div>
    // }

    return (
        <div>
            {vehicles.length === 0 ? (
                <p className='text-white'>No hay vehículos registrados.</p>
            ) : (
                <section className="flex flex-col">
                    {vehicles.map(vehicle => (
                        <Link to={`/vehicle/${vehicle.id}`} key={vehicle.id}>
                            <div
                                className="  rounded-md p-4 mb-3 "
                                style={{ backgroundColor: `${vehicle.color}cc` }}
                            >
                                <div className="flex flex-col">
                                    <h2 className="text-xl  mb-3">{vehicle.marca} - {vehicle.modelo}</h2>

                                    <h2 className="text-lg ">{vehicle.matricula}</h2>
                                </div>

                                {/* {nextITVSentence} */}

                            </div>
                        </Link>
                    ))}
                </section>
            )
            }
        </div >
    )

}
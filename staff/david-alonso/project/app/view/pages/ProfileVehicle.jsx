import { useParams } from "react-router"
import { DateTime } from 'luxon'

import { Link } from "react-router"
import { useVehicle } from "../../hooks/vehicle.hooks"
import { logic } from '../../logic'
import { getUserId } from "../../logic/getUserId"

import { Printer, Trash2, PencilLine, ChevronLeft } from "lucide-react"

export const ProfileVehicle = ({ onVehicleDeleted }) => {
    const { id } = useParams()
    const vehicle = useVehicle(id)

    if (!vehicle) return <p>Cargando...</p>

    const userId = getUserId()

    const nextITVDate = DateTime.fromISO(vehicle?.itv).plus({ year: 1 })
    const timeToNextITV = nextITVDate.diff(DateTime.now().startOf('day'), ['months', 'days']).toObject()

    let nextITVSentence = ''
    if (timeToNextITV.months >= 1) {
        nextITVSentence =
            <div className={`p-1 pl-3 mb-5 rounded-md`} >
                <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
                <p>Dentro de {timeToNextITV.months} {Math.floor(timeToNextITV.months) <= 1 ? 'mes' : 'meses'}</p>
            </div>
    } else if (timeToNextITV.months >= 0 && timeToNextITV.months < 1) {
        const showAlert = timeToNextITV.days < 7
        if (timeToNextITV.days >= 1) {
            nextITVSentence =
                <div className={`p-1 pl-3 mb-5 rounded-md ${showAlert ? "bg-red-500 " : "bg-amber-500 "}`} >
                    <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
                    <p>Dentro de {Math.floor(timeToNextITV.days)} {Math.floor(timeToNextITV.days) <= 1 ? 'día' : 'días'} {showAlert && '⚠️'}</p>
                </div>


        } else if (timeToNextITV.days >= 0 && timeToNextITV.days < 1) {
            nextITVSentence =
                <div className={`p-1 pl-3 mb-5 rounded-md bg-red-500 `} >
                    <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
                    <p>Hoy {showAlert && '⚠️'}</p>
                </div>

        } else {
            nextITVSentence =
                <div className={`p-1 pl-3 mb-5 rounded-md bg-red-500`} >
                    <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
                    <p>Hace {Math.abs(Math.floor(timeToNextITV.days))} {Math.abs(Math.floor(timeToNextITV.days)) <= 1 ? 'día' : 'días'} ⚠️</p>
                </div>

        }
    } else {
        nextITVSentence =
            <div className={`p-1 pl-3 mb-5 rounded-md bg-red-500`} >
                <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
                <p>Hace {Math.abs(Math.floor(timeToNextITV.months))} {Math.abs(Math.floor(timeToNextITV.months)) <= 1 ? 'mes' : 'meses'} ⚠️</p>
            </div>
    }

    const handleDeleteClick = () => {

        if (confirm('Delete vehicle ?'))
            try {
                logic.deleteVehicle(userId, vehicle._id)
                    .then(() => onVehicleDeleted())
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }


    return (
        <div className="relative min-h-screen">

            <div className="relative z-10 flex flex-col min-h-screen">

                <header>
                    <div key={vehicle.id}
                        className=" pt-5 p-5"
                        style={{ backgroundColor: `${vehicle.color}cc` }}>

                        <div className='flex justify-between items-center w-full mb-5'>
                            <Link to="/"><ChevronLeft color="white" size={24} /></Link>

                            {/* IMPRIMIR */}
                            <div className='flex gap-5 '>
                                <Link><Printer color="white" size={24} /></Link>

                                {/* EDITAR */}
                                <Link to={`/vehicleRegister/${id}`}><PencilLine color="white" size={24} /></Link>

                                {/* BORRAR */}
                                <button onClick={() => handleDeleteClick(vehicle._id)} className=" bg-transparent border-none p-0 cursor-pointer">
                                    <Trash2 color="white" size={24} />
                                </button>

                            </div>
                        </div>

                        <h1 className="text-2xl mb-2">{vehicle.marca} - {vehicle.modelo}</h1>

                        <h2 className="text-md">{vehicle.año}</h2>

                        <h2 className="text-lg font-bold">{vehicle.matricula}</h2>
                    </div>
                </header >

                <section key={`${vehicle.id}-section`}
                    className=" pt-5 p-3 pb-5"
                    style={{ backgroundColor: `${vehicle.color}90` }}>

                    {nextITVSentence}
                    {/* ?????? */}

                    <div className=" p-1 pl-3 rounded-md">
                        <h2 className="text-gray-200 text-sm">PRESION DE NEUMATICOS</h2>
                        <h2>2.5 - 2.9 bar delante y detras</h2>
                    </div>
                </section>

                <section className=" flex flex-col pt-10 p-5 ">

                    <Link to={`/vehicle/${id}/maintenance`} className="bg-white text-black p-2 rounded-md w-full text-center">+ AÑADIR SERVICIO</Link>

                    <div className="mb-3 mt-3">
                        <h2>HISTORIAL DE SERVICIOS</h2>
                    </div>

                    {vehicle.manteinances.map(manteinance => (

                        <Link
                            to={`/vehicle/${vehicle._id}/maintenance/${manteinance._id}`}
                            key={manteinance._id}
                            className=" mb-5 flex justify-between opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <div className="flex flex-col text-white">
                                <h2 className="text-ml text-gray-300">{manteinance.fecha}</h2>

                                <h2 className="text-xl">{manteinance.descripcion}</h2>
                            </div>
                        </Link>

                    ))}
                </section>

            </div >
        </div>)
}

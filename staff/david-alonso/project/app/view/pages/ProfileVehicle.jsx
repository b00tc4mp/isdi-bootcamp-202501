import { useParams } from "react-router"
import { DateTime } from 'luxon'

import { Link } from "react-router"
import { useVehicle } from "../../hooks/vehicle.hooks"

import { Printer, Trash2, PencilLine, ChevronLeft } from "lucide-react"

export const ProfileVehicle = () => {
    const { id } = useParams();
    const vehicle = useVehicle(id)

    if (!vehicle) return <p>Cargando...</p>

    const nextITVDate = DateTime.fromISO(vehicle?.itv).plus({ year: 1 })
    const timeToNextITV = nextITVDate.diff(DateTime.now().startOf('day'), ['months', 'days']).toObject()

    let nextITVSentence = ''
    if (timeToNextITV.months >= 1) {
        nextITVSentence = <p>Dentro de {timeToNextITV.months} {Math.floor(timeToNextITV.months) <= 1 ? 'mes' : 'meses'}</p>
    } else if (timeToNextITV.months >= 0 && timeToNextITV.months < 1) {
        const showAlert = timeToNextITV.days < 7
        if (timeToNextITV.days >= 1) {
            nextITVSentence = <p className={showAlert ? "bg-red-500 border-2 border-amber-950" : "bg-amber-500 border-2 border-amber-950"}>Dentro de {Math.floor(timeToNextITV.days)} {Math.floor(timeToNextITV.days) <= 1 ? 'día' : 'días'} {showAlert && '⚠️'}</p>
        } else if (timeToNextITV.days >= 0 && timeToNextITV.days < 1) {
            nextITVSentence = <p className="bg-red-500 border-2 border-amber-950">Hoy!</p>
        } else {
            nextITVSentence = <p className="bg-red-500 border-2 border-amber-950">Hace {Math.abs(Math.floor(timeToNextITV.days))} {Math.abs(Math.floor(timeToNextITV.days)) <= 1 ? 'día' : 'días'}</p>
        }
    } else {
        nextITVSentence = <p>Hace {Math.abs(Math.floor(timeToNextITV.months))} {Math.abs(Math.floor(timeToNextITV.months)) <= 1 ? 'mes' : 'meses'}</p>
    }

    return (
        <div className="min-h-screen flex flex-col">
            <header>
                <div key={vehicle.id}
                    className=" pt-5 p-5"
                    style={{ backgroundColor: `${vehicle.color}90` }}>

                    <div className='flex justify-start w-full mb-5'>
                        <Link to="/"><ChevronLeft color="white" size={24} /></Link>

                        {/* IMPRIMIR */}
                        <div className='flex justify-end w-full gap-5 '>
                            <Link><Printer color="white" size={24} /></Link>

                            {/* COMPARTIR */}
                            <Link><Trash2 color="white" size={24} /></Link>

                            {/* EDITAR */}
                            <Link to={`/vehicleRegister/${id}`}><PencilLine color="white" size={24} /></Link>
                        </div>
                    </div>

                    <h1 className="text-lg font-bold mb-5">{vehicle.marca} - {vehicle.modelo}</h1>

                    <h1>{vehicle.año}</h1>

                    <h2 className="text-lg font-bold">{vehicle.matricula}</h2>
                </div>
            </header >

            <section key={`${vehicle.id}-section`}
                className=" pt-10 p-5 pb-10"
                style={{ backgroundColor: `${vehicle.color}60` }}>
                <div>

                    <h2>Próxima ITV</h2>
                    {nextITVSentence}

                </div>
            </section>

            <section className=" flex flex-col pt-10 p-5 ">

                <Link to={`/vehicle/${id}/maintenance`} className="bg-white text-black p-2 rounded-md w-full text-center">+ AÑADIR SERVICIO</Link>

                <div className="mb-3 mt-3">
                    <h2>HISTORIAL DE SERVICIOS</h2>
                </div>

                {vehicle.manteinances.map(manteinance => (
                    <div key={manteinance._id}
                        className=" bg-zinc-500 rounded-2xl p-4 mb-5 flex justify-between opacity-80 "

                    >
                        <div className="flex flex-col">
                            <h2 className="text-ml ">{manteinance.fecha}</h2>

                            <h2 className="text-ml ">{manteinance.descripcion}</h2>

                            <h2 className="text-ml ">{manteinance.texto}</h2>
                        </div>

                    </div>
                ))}
            </section>

        </div >
    )
}

import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useVehicle } from '../../hooks/vehicle.hooks'
import { logic } from '../../logic'
import { Link } from 'react-router'
import { useContext } from '../../context'

import { Trash2, PencilLine, ChevronLeft, CalendarCheck, Wrench, FileText, Gauge, FileImage } from "lucide-react"

export const MaintenanceDetail = ({ onDeletedManteinance }) => {

    const { alert, confirm } = useContext()

    const { vehicleId, maintenanceId } = useParams()
    const vehicle = useVehicle(vehicleId)
    const [mantenimiento, setMantenimiento] = useState(null)


    useEffect(() => {
        if (vehicle && vehicle.manteinances) {
            const found = vehicle.manteinances.find(m => m._id === maintenanceId)
            setMantenimiento(found || null)
        }
    }, [vehicle, maintenanceId])

    if (!vehicle) return <div>Cargando vehículo...</div>

    if (!mantenimiento) return <div>Mantenimiento no encontrado</div>

    const fechaObj = new Date(mantenimiento.fecha);
    const dia = String(fechaObj.getDate()).padStart(2, '0');
    const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const año = fechaObj.getFullYear();
    const formattedDate = `${dia}-${mes}-${año}`;

    const handleDeleteManteinanceClick = () => {
        confirm('Delete maintenance ?').then((result) => {

            if (result) {
                try {
                    logic.deleteVehicleManteinance(maintenanceId)
                        .then(() => onDeletedManteinance(vehicleId))
                        .catch(error => {
                            console.error(error)

                            alert(error.message)
                        })
                } catch (error) {
                    console.error(error)

                    alert(error.message)
                }
            }
        })

    }

    return (
        <div className="relative min-h-screen">

            <div className="relative z-10 flex flex-col p-5 min-h-screen">

                <div className='flex justify-between items-center w-full mb-5'>
                    <Link to={`/vehicle/${vehicle._id}`}><ChevronLeft color="white" size={24} /></Link>

                    <div className='flex gap-5 '>
                        {/* EDITAR */}
                        <Link to={`/vehicle/${vehicle._id}/maintenance/${maintenanceId}`}>
                            <PencilLine color="white" size={24} />
                        </Link>

                        {/* BORRAR */}
                        <button onClick={() => handleDeleteManteinanceClick(maintenanceId)} className=" bg-transparent border-none p-0 cursor-pointer">
                            <Trash2 color="white" size={24} />
                        </button>
                    </div>
                </div>

                <h1 className="text-xl mt-5 pb-5">DETALLE DEL SERVICIO</h1>

                <div className='mb-20'>
                    <div className='flex items-center gap-6 border border-black bg-white text-black pt-0 p-5 rounded-t-lg'>
                        <CalendarCheck size={30} className="flex-shrink-0" />
                        <div className='mt-3'>
                            <p><strong>Fecha:</strong></p>
                            <h2>{formattedDate}</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 border border-black bg-white text-black pt-0 p-5">
                        <Gauge size={30} className="flex-shrink-0" />
                        <div className='mt-3'>
                            <p><strong>Km:</strong></p>
                            <h2>{mantenimiento.km}</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 border border-black bg-white text-black pt-0 p-5">
                        <Wrench size={30} className="flex-shrink-0" />
                        <div className='mt-3'>
                            <p><strong>Título</strong></p>
                            <h2>{mantenimiento.descripcion}</h2>
                        </div>
                    </div>

                    <div className='flex items-center gap-6 border border-black bg-white text-black pt-0 p-5 pb-15'>
                        <FileText size={30} className="flex-shrink-0" />
                        <div className='mt-3 break-words max-w-xs'>
                            <p><strong>Descripción</strong></p>
                            <h2>{mantenimiento.texto}</h2>
                        </div>
                    </div>

                    <div className='flex items-center gap-6 border border-black bg-white text-black pt-5 p-5 rounded-b-lg'>
                        <FileImage size={30} className="flex-shrink-0" />
                        <div className='mt-3 break-words max-w-xs'>
                            {mantenimiento.image ? (
                                <img src={mantenimiento.image} className="image" />
                            ) : null}
                        </div>
                    </div>


                </div>
            </div>
        </div>)
}

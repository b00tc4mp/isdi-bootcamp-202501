import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useVehicle } from '../../hooks/vehicle.hooks'
import { Link } from 'react-router'
import { Trash2, PencilLine, ChevronLeft } from "lucide-react"

export const MaintenanceDetail = () => {
    const { vehicleId, maintenanceId } = useParams()
    const vehicle = useVehicle(vehicleId)
    const [mantenimiento, setMantenimiento] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        if (vehicle && vehicle.manteinances) {
            const found = vehicle.manteinances.find(m => m._id === maintenanceId)
            setMantenimiento(found || null)
        }
    }, [vehicle, maintenanceId])

    if (!vehicle) return <div>Cargando vehículo...</div>

    if (!mantenimiento) return <div>Mantenimiento no encontrado</div>

    const formattedDate = new Date(mantenimiento.fecha).toISOString().split('T')[0]

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
                        <Link><Trash2 color="white" size={24} /></Link>
                    </div>
                </div>

                <h1 className="text-xl mt-5 pb-5">DETALLE DEL SERVICIO</h1>

                <div className='mb-20'>
                    <div className='border border-black bg-white text-black p-5 rounded-t-lg'>
                        <p><strong>Fecha:</strong></p>
                        <h2>{formattedDate}</h2>
                    </div>

                    <div className='border border-black bg-white text-black p-5 '>
                        <p><strong>Descripción:</strong></p>
                        <h2>{mantenimiento.descripcion}</h2>
                    </div>

                    <div className='border border-black bg-white text-black p-5 pb-30 rounded-b-lg'>
                        <p><strong>Texto:</strong></p>
                        <h2>{mantenimiento.texto}</h2>
                    </div>
                </div>
            </div>
        </div>)
}

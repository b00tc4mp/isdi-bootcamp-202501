import { Link, useParams, useNavigate } from "react-router"
import { logic } from "../../logic";
import { useEffect, useState } from "react";
import { useVehicle } from '../../hooks/vehicle.hooks.js'


export function Maintenance({ onAddedMaintenance }) {
    const { vehicleId, maintenanceId } = useParams()
    const navigate = useNavigate()
    const vehicle = useVehicle(vehicleId)

    const [fecha, setFecha] = useState()
    const [descripcion, setDescripcion] = useState()
    const [texto, setTexto] = useState()

    useEffect(() => {

        const maintenance = vehicle?.manteinances.find((m) => m._id === maintenanceId)
        if (maintenance) {
            setFecha(maintenance.fecha.split('T')[0])
            setDescripcion(maintenance.descripcion)
            setTexto(maintenance.texto)
        }
    }, [vehicle])

    const isEditing = maintenanceId != undefined

    const handleMaintenanceSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event
            const {
                fecha: { value: fecha },
                descripcion: { value: descripcion },
                texto: { value: texto },

            } = form

            if (isEditing) {
                logic.updateVehicleManteinance(maintenanceId, new Date(fecha), descripcion, texto)
                    .then(() => {
                        form.reset()
                        navigate(`/vehicle/${vehicleId}`)
                    })
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } else {
                logic.registerManteinance(vehicleId, new Date(fecha), descripcion, texto)
                    .then(() => {
                        form.reset()
                        onAddedMaintenance()
                    })
                    .catch(error => {
                        console.error(error)
                        alert(error.message)
                    })
            }

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    return <div className="relative min-h-screen">

        <div className="relative z-10 flex flex-col p-5 justify-between min-h-screen">

            <h1 className="text-xl mt-5 pb-5">{isEditing ? 'EDITAR SERVICIO' : 'AÑADIR SERVICIO'}</h1>

            <div className="flex justify-center mt-auto">
                <form onSubmit={handleMaintenanceSubmit}>

                    <div className="pb-25 ">
                        <label htmlFor="fecha">Fecha</label>
                        <input type="date" id="fecha" value={fecha} onInput={(e) => setFecha(e.target.value)} />

                        <label htmlFor="descripcion">Descripcion</label>
                        <input type="text" id="descripcion" value={descripcion} onInput={(e) => setDescripcion(e.target.value)} />

                        <label htmlFor="texto">Texto</label>
                        <textarea name="texto" id="texto" value={texto} onInput={(e) => setTexto(e.target.value)} className="w-full bg-gray-300 border border-gray-400 rounded-lg p-5 pb-20"></textarea>
                    </div>
                    <button type="submit" >{isEditing ? 'GUARDAR' : 'AÑADIR'}</button>

                    <div className="flex justify-center">
                        <Link to={`/vehicle/${vehicleId}`} className='underline text-white'>CANCELAR</Link>
                    </div>
                </form>
            </div>

        </div >
    </div >
}
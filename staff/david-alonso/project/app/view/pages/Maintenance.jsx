import { Link, useParams, useNavigate } from "react-router"
import { logic } from "../../logic";
import { useEffect, useState } from "react";
import { useVehicle } from '../../hooks/vehicle.hooks.js'
import { useContext } from '../../context'


export function Maintenance() {
    const { alert } = useContext()

    const { vehicleId, maintenanceId } = useParams()
    const navigate = useNavigate()
    const vehicle = useVehicle(vehicleId)

    const [fecha, setFecha] = useState()
    const [km, setKm] = useState()
    const [descripcion, setDescripcion] = useState()
    const [texto, setTexto] = useState()
    const [image, setImage] = useState()

    useEffect(() => {

        const maintenance = vehicle?.manteinances.find((m) => m._id === maintenanceId)
        if (maintenance) {
            setFecha(maintenance.fecha.split('T')[0])
            setKm(maintenance.km)
            setDescripcion(maintenance.descripcion)
            setTexto(maintenance.texto)
            setImage(maintenance.image)
        }
    }, [vehicle])

    const isEditing = maintenanceId != undefined

    const handleMaintenanceSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event
            const {
                fecha: { value: fecha },
                km: { value: rawKm },
                descripcion: { value: descripcion },
                texto: { value: texto },
                image: { value: image }
            } = form

            const km = Number(rawKm)

            if (isEditing) {
                logic.updateVehicleManteinance(maintenanceId, new Date(fecha), km, descripcion, texto, image)
                    .then(() => {
                        form.reset()
                        navigate(`/vehicle/${vehicleId}`)
                    })
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } else {
                logic.registerManteinance(vehicleId, new Date(fecha), km, descripcion, texto, image)
                    .then(() => {
                        form.reset()
                        navigate(`/vehicle/${vehicleId}`)
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

            <h1 className="text-xl mt-5">{isEditing ? 'EDITAR SERVICIO' : 'AÑADIR SERVICIO'}</h1>

            <div className="flex justify-center">
                <form onSubmit={handleMaintenanceSubmit}>

                    <div className="pb-10 ">
                        <label htmlFor="fecha">Fecha Servicio</label>
                        <input type="date" id="fecha" value={fecha} onInput={(e) => setFecha(e.target.value)} />

                        <label htmlFor="km">Km</label>
                        <input type="number" id="km" placeholder=" Km" value={km} onInput={(e) => setKm(Number(e.target.value))}
                        />

                        <label htmlFor="descripcion">Servicio</label>
                        <input type="text" id="descripcion" placeholder=" Servicio" value={descripcion} onInput={(e) => setDescripcion(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} />

                        <label htmlFor="texto">Descripción</label>
                        <textarea name="texto" id="texto" placeholder=" Descripción" value={texto} onInput={(e) => setTexto(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} className="w-full bg-gray-300 border border-gray-400 rounded-lg p-5"></textarea>

                        <label htmlFor="image">Imagen Factura</label>
                        <input type="url" id="image" placeholder=" Imagen Factura" value={image} onInput={(e) => setImage((e.target.value))} />
                    </div>

                    <button type="submit" className='cursor-pointer'>{isEditing ? 'GUARDAR' : 'AÑADIR'}</button>

                    <div className="flex justify-center">
                        <Link to={`/vehicle/${vehicleId}`} className='underline text-white'>CANCELAR</Link>
                    </div>
                </form>
            </div>

        </div >
    </div >
}
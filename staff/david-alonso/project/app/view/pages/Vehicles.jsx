import { useParams } from "react-router"
import { useEffect, useState } from 'react'
import { getVehicles } from '../../logic/vehicle/getVehicles'
import { Link } from 'react-router'
import { useVehicle } from "../../hooks/vehicle.hooks"
import { ITVAlert } from "../components/ITVAlert"

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

                                    <div className="flex justify-between">
                                        <h2 className="text-lg ">{vehicle.matricula}</h2>

                                        <ITVAlert itvDate={vehicle.itv} />
                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))}
                </section>
            )
            }
        </div >
    )

}
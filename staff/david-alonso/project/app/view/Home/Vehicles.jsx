import { useEffect, useState } from 'react'
import { getVehicles } from '../../logic/getVehicles'
import { useNavigate } from 'react-router'

export const Vehicles = () => {
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    const navigate = useNavigate();

    const handleClick = (matricula) => {
        navigate(`/vehicle/${matricula}`);
    };

    return (
        <div>
            {vehicles.length === 0 ? (
                <p className='text-white'>No hay vehículos registrados.</p>
            ) : (
                <section className="flex flex-col">
                    {vehicles.map(vehicle => (
                        <div key={vehicle.id} onClick={() => handleClick(vehicle.id)}
                            className=" bg-zinc-500 rounded-2xl p-4 mb-5 flex justify-between opacity-80 "
                            // style={{ borderColor: vehicle.color }}
                            style={{ backgroundColor: vehicle.color }}
                        >
                            <div className="flex flex-col">
                                <h2 className="text-lg font-bold mb-5">{vehicle.marca} - {vehicle.modelo}</h2>

                                <h2 className="text-lg font-bold">{vehicle.matricula}</h2>

                                {/* MATRICULA ???*/}
                                {/* <div className="relative w-30 h-8 bg-[url('/images/Matricula.png')] bg-cover">
                                <span className="absolute flex mt-1 ml-5 text-lg font-bold tracking-widest text-black">
                                    {vehicle.matricula}
                                </span>
                            </div> */}
                            </div>

                            {/* IMAGEN MOTO ??? */}
                            {/* <div className="w-20 h-20 bg-[url('/images/Moto.png')] bg-contain bg-no-repeat"></div> */}


                        </div>
                    ))}
                </section>
            )
            }
        </div >
    )

}
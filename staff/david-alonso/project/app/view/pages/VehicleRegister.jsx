import { logic } from '../../logic/index.js'
import { Link, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from "react"
import { useVehicle } from '../../hooks/vehicle.hooks.js'
import { useContext } from '../../context'

import { ChevronLeft } from "lucide-react"


export function VehicleRegister({ onVehicleRegistered }) {
    const { alert } = useContext()

    const { id } = useParams()
    const navigate = useNavigate()
    const vehicle = useVehicle(id)
    const [marca, setMarca] = useState()
    const [modelo, setModelo] = useState()
    const [año, setAño] = useState()
    const [color, setColor] = useState()
    const [matricula, setMatricula] = useState()
    const [km, setKm] = useState()
    const [itv, setItv] = useState()

    const [tipoVehiculo, setTipoVehiculo] = useState(null)

    useEffect(() => {
        if (vehicle) {
            setMarca(vehicle.marca)
            setModelo(vehicle.modelo)
            setAño(vehicle.año)
            setColor(vehicle.color)
            setMatricula(vehicle.matricula)
            setKm(vehicle.km)
            setItv(vehicle.itv.split('T')[0])
        }
    }, [vehicle])


    const isEditing = id != undefined

    const handleVehicleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                marca: { value: marca },
                modelo: { value: modelo },
                año: { value: año },
                color: { value: color },
                matricula: { value: matricula },
                km: { value: km },
                itv: { value: itv }
            } = form

            const author = logic.getUserId()

            if (!tipoVehiculo) {
                alert('Por favor selecciona un tipo de vehículo')
                return
            }


            if (isEditing) {
                logic.updateVehicle(id, marca, modelo, parseInt(año), color, matricula, parseInt(km), new Date(itv), author)
                    .then(() => {
                        form.reset()
                        navigate(`/vehicle/${id}`)
                    })
                    .catch(error => {
                        console.error(error)
                        alert(error.message)
                    })
            } else {
                logic.registerVehicle(marca, modelo, parseInt(año), color, matricula, parseInt(km), new Date(itv), author)
                    .then(() => {
                        form.reset()
                        onVehicleRegistered()
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

        <div className="relative z-10 flex flex-col p-5 min-h-screen">

            <div className='flex justify-start w-full'>
                <Link to={isEditing ? `/vehicle/${id}` : "/"}><ChevronLeft color="white" size={24} /></Link>
            </div>

            <h1 className="text-xl mt-5 pb-5">{isEditing ? 'EDITAR VEHICULO' : 'NUEVO VEHICULO'}</h1>

            <div className="flex justify-center">
                <form onSubmit={handleVehicleRegisterSubmit} className="flex flex-col w-full max-w-md">

                    {/* **** */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="tipo">Tipo de vehículo</label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setTipoVehiculo('coche')}
                                className={`p-2 rounded ${tipoVehiculo === 'coche' ? 'bg-gray-400' : ''}`}
                            >
                                <div className='flex flex-col items-center'>
                                    <img src="/images/icon-car.svg" />
                                    <span>Coche</span>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setTipoVehiculo('moto')}
                                className={`p-2 rounded ${tipoVehiculo === 'moto' ? 'bg-gray-400' : ''}`}
                            >
                                <div className='flex flex-col items-center'>
                                    <img src="/images/icon-bike.svg" />
                                    <span>Moto</span>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setTipoVehiculo('scooter')}
                                className={`p-2 rounded ${tipoVehiculo === 'scooter' ? 'bg-gray-400' : ''}`}
                            >
                                <div className='flex flex-col items-center'>
                                    <img src="/images/icon-scooter.svg" />
                                    <span>Scooter</span>
                                </div>
                            </button>
                        </div>

                        {tipoVehiculo && (
                            <div className='flex justify-center'>
                                <p className="text-lg text-white mt-1">
                                    Seleccionado: <span className="font-semibold">{tipoVehiculo}</span>
                                </p>
                            </div>
                        )}
                    </div>
                    {/* **** */}

                    <div className="flex flex-col gap-1 -mt-4">
                        <label htmlFor="marca">Marca</label>
                        <input type="text" id="marca" className="capitalize"
                            value={marca} onInput={(e) =>
                                setMarca(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                            }
                        />

                        <label htmlFor="modelo">Modelo</label>
                        <input type="text" id="modelo" className="capitalize"
                            value={modelo} onInput={(e) =>
                                setModelo(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                            }
                        />

                        <label htmlFor="matricula">Matricula</label>
                        <input type="text" id="matricula" className="uppercase"
                            value={matricula} onInput={(e) => setMatricula(e.target.value.toUpperCase())}
                        />
                    </div>


                    <div className='-mt-2'>
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 w-1/2">
                                <label htmlFor="año">Año</label>
                                <input type="number" id="año" onInput={(e) => setAño(e.target.value)} value={año} />
                            </div>

                            <div className="flex flex-col gap-1 w-1/2">
                                <label htmlFor="itv">Última ITV</label>
                                <input type="date" id="itv" value={itv} onInput={(e) => setItv(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 w-1/2">
                                <label htmlFor="km">Km</label>
                                <input type="number" id="km" value={km} onInput={(e) => setKm(e.target.value)} />
                            </div>

                            <div className="flex flex-col gap-1 w-1/2">
                                <label htmlFor="color">Color</label>
                                <input type="color" id="color" onInput={(e) => setColor(e.target.value)} value={color} className="w-full h-10 " />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className='cursor-pointer'>{isEditing ? 'GUARDAR' : 'AÑADIR'}</button>

                </form>
            </div>

        </div >
    </div >
}
import { logic } from '../logic/index.js'
import { Link, useParams } from 'react-router'
import { useEffect, useState } from "react"
import { useVehicle } from '../hooks/vehicle.hooks.js'

export function VehicleRegister({ onVehicleRegistered }) {
    const { id } = useParams()
    const vehicle = useVehicle(id)
    const [marca, setMarca] = useState()
    const [modelo, setModelo] = useState()
    const [año, setAño] = useState()
    const [color, setColor] = useState()
    const [matricula, setMatricula] = useState()
    const [km, setKm] = useState()
    const [itv, setItv] = useState()

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

            if (isEditing) {
                logic.updateVehicle(id, marca, modelo, parseInt(año), color, matricula, parseInt(km), new Date(itv), author)
                    .then(() => {
                        form.reset()
                        onVehicleRegistered()
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


    return <div className="min-h-screen flex flex-col p-5">

        <div className='flex justify-start w-full'>
            <Link to={isEditing ? `/vehicle/${id}` : "/"}>⏪</Link>
        </div>

        <h1 className="text-2xl m-5 mt-10">{isEditing ? 'EDITAR VEHICULO' : 'NUEVO VEHICULO'}</h1>

        <div className="">
            <form onSubmit={handleVehicleRegisterSubmit} className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl/30 space-y-4">

                <div className="flex gap-4">
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">Coche</button>
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">Moto</button>
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">Scooter</button>
                </div>

                <input type="text" id="marca" placeholder="Marca" onInput={(e) => setMarca(e.target.value)} className="w-full border border-gray-400 rounded-lg p-2 " value={marca} />

                <input type="text" id="modelo" placeholder="Modelo" onInput={(e) => setModelo(e.target.value)} className="w-full border border-gray-400 rounded-lg p-2 " value={modelo} />

                <div className="flex gap-4">
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">G</button>
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">D</button>
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">E</button>
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">H</button>
                </div>

                <div className="flex gap-4">
                    <input type="number" id="año" placeholder="Año" onInput={(e) => setAño(e.target.value)} value={año} className="w-full border border-gray-400 rounded-lg p-2 " />

                    <input type="color" id="color" placeholder="Color" onInput={(e) => setColor(e.target.value)} value={color} className="w-full h-11 border border-gray-400 rounded-lg p-2 " />
                </div>

                <input type="text" id="matricula" placeholder="Matricula" onInput={(e) => setMatricula(e.target.value)} value={matricula} className="w-full border border-gray-400 rounded-lg p-2" />

                <div className="flex gap-4">
                    <input type="number" id="km" placeholder="KM" onInput={(e) => setKm(e.target.value)} value={km} className="w-full border border-gray-400 rounded-lg p-2 " />

                    <input type="date" id="itv" onInput={(e) => setItv(e.target.value)} value={itv} className="w-full border border-gray-400 rounded-lg p-2 " />
                </div>

                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-800">{isEditing ? 'GUARDAR' : 'CREAR'}</button>

            </form>
        </div>

    </div>

}
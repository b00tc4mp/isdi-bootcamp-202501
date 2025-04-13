// import { useContext } from "react"
// import { logic } from "../logic/index.js"

import { logic } from '../logic/index.js'
import { Link } from 'react-router'


export function VehicleRegister({ onNavigateToLogin, onVehicleRegistered }) {

    // const { alert } = useContext()

    const handleVehicleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                marca: { value: marca },
                modelo: { value: modelo },
                año: { value: año },
                matricula: { value: matricula },
                km: { value: km },
                itv: { value: itv }
            } = form

            console.log(itv, typeof itv)

            logic.registerVehicle(marca, modelo, parseInt(año), matricula, parseInt(km), new Date(itv))
                .then(() => {
                    form.reset()

                    onVehicleRegistered()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    console.debug('Register -> render')

    return <div className="min-h-screen flex flex-col p-5">

        <div className='flex justify-start w-full'>
            <Link to="/">⏪</Link>
        </div>

        <h1 className="text-2xl m-5 mt-10">NUEVO VEHICULO</h1>

        <div className="">
            <form onSubmit={handleVehicleRegisterSubmit} className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl/30 space-y-4">

                <div className="flex gap-4">
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">Coche</button>
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">Moto</button>
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">Scooter</button>
                </div>

                <input type="text" id="marca" placeholder="Marca" className="w-full border border-gray-400 rounded-lg p-2 " />

                <input type="text" id="modelo" placeholder="Modelo" className="w-full border border-gray-400 rounded-lg p-2 " />

                <div className="flex gap-4">
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">G</button>
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">D</button>
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">E</button>
                    <button type="click" className="flex-1 border border-gray-400 rounded-lg p-2 cursor-pointer">H</button>
                </div>

                <div className="flex gap-4">
                    <input type="number" id="año" placeholder="Año" className="w-full border border-gray-400 rounded-lg p-2 " />

                    <input type="color" id="color" placeholder="Color" className="w-full h-11 border border-gray-400 rounded-lg p-2 " />
                </div>

                <input type="text" id="matricula" placeholder="Matricula" className="w-full border border-gray-400 rounded-lg p-2" />

                <div className="flex gap-4">
                    <input type="number" id="km" placeholder="KM" className="w-full border border-gray-400 rounded-lg p-2 " />

                    <input type="date" id="itv" className="w-full border border-gray-400 rounded-lg p-2 " />
                </div>

                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-800">CREAR</button>

            </form>
        </div>

    </div>

}
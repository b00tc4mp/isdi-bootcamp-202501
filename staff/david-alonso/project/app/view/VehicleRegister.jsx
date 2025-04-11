// import { useContext } from "react"
// import { logic } from "../logic/index.js"

import { useContext } from '../context.js'
import { logic } from '../logic/index.js'

export function VehicleRegister({ onNavigateToLogin, onVehicleReegister }) {

    // const { alert } = useContext()

    const handleVehicleRegisterSubmit = event => {
        event.preventDefault()

        // try {
        //     const { target: form } = event

        //     const {
        //         name: { value: name },
        //         email: { value: email },
        //         password: { value: password }
        //     } = form

        //     logic.registerUser(name, email, password)
        //         .then(() => {
        //             form.reset()

        //             onVehicleRecord()
        //         })
        //         .catch(error => {
        //             console.error(error)

        //             alert(error.message)
        //         })
        // } catch (error) {
        //     console.error(error)

        //     alert(error.message)
        // }
    }

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Register -> render')

    return <div className="flex flex-col p-3 justify-center items-center">
        <h1 className="text-2xl m-5">REGISTRO VEHICULO</h1>

        <div className="">
            <form onSubmit={handleVehicleRegisterSubmit} className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl/30 space-y-4">

                <div className="flex gap-4">
                    <button type="click" className="flex-1 border border-gray-300 rounded-lg p-2 cursor-pointer">Coche</button>
                    <button type="click" className="flex-1 border border-gray-300 rounded-lg p-2 cursor-pointer">Moto</button>
                    <button type="click" className="flex-1 border border-gray-300 rounded-lg p-2 cursor-pointer">Scooter</button>
                </div>

                <input type="text" id="marca" placeholder="Marca" className="w-full border border-gray-300 rounded-lg p-2 " />

                <input type="text" id="modelo" placeholder="Modelo" className="w-full border border-gray-300 rounded-lg p-2 " />

                <div className="flex gap-4">
                    <button type="click" className="flex-1 border border-gray-300 rounded-lg p-2 cursor-pointer">G</button>
                    <button type="click" className="flex-1 border border-gray-300 rounded-lg p-2 cursor-pointer">D</button>
                    <button type="click" className="flex-1 border border-gray-300 rounded-lg p-2 cursor-pointer">E</button>
                    <button type="click" className="flex-1 border border-gray-300 rounded-lg p-2 cursor-pointer">H</button>
                </div>

                <div className="flex gap-4">
                    <input type="text" id="año" placeholder="Año" className="w-full border border-gray-300 rounded-lg p-2 " />

                    <input type="text" id="color" placeholder="Color" className="w-full border border-gray-300 rounded-lg p-2 " />
                </div>

                <input type="text" id="matricula" placeholder="Matricula" className="w-full border border-gray-300 rounded-lg p-2" />

                <div className="flex gap-4">
                    <input type="text" id="km" placeholder="KM" className="w-full border border-gray-300 rounded-lg p-2 " />

                    <input type="text" id="itv" placeholder="ITV" className="w-full border border-gray-300 rounded-lg p-2 " />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">CREAR</button>

                <div className="flex justify-center">
                    <a onClick={handleLoginClick} className="underline">LOGIN</a>
                </div>

            </form>
        </div>

    </div>

}
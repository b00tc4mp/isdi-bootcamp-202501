import { useParams } from "react-router"
import { useEffect, useState } from 'react'

import { Link } from "react-router"
import { useVehicle } from "../../hooks/vehicle.hooks"
import { logic } from '../../logic'
import { NextITV } from "../components/NextITV"
import { useContext } from '../../context'

import { Share2, Trash2, PencilLine, ChevronLeft, FileCheck, ChevronRight } from "lucide-react"

export const ProfileVehicle = ({ onVehicleDeleted }) => {
    const { alert, confirm } = useContext()

    const { id } = useParams()
    const vehicle = useVehicle(id)


    if (!vehicle) return <p>Cargando...</p>

    const handleDeleteClick = () => {

        if (confirm('Delete vehicle ?'))
            try {
                logic.deleteVehicle(id)
                    .then(() => onVehicleDeleted())
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }


    return (
        <div className="relative min-h-screen">

            <div className="relative z-10 flex flex-col min-h-screen">

                <header>
                    <div key={vehicle.id}
                        className=" pt-5 p-5"
                        style={{ backgroundColor: `${vehicle.color}cc` }}>

                        <div className='flex justify-between items-center w-full mb-5'>
                            <Link to="/"><ChevronLeft color="white" size={24} /></Link>

                            {/* COMPARTIR */}
                            <div className='flex gap-5 '>
                                <Link><Share2 color="white" size={24} /></Link>

                                {/* EDITAR */}
                                <Link to={`/vehicleRegister/${id}`}><PencilLine color="white" size={24} /></Link>

                                {/* BORRAR */}
                                <button onClick={handleDeleteClick} className=" bg-transparent border-none p-0 cursor-pointer">
                                    <Trash2 color="white" size={24} />
                                </button>

                            </div>
                        </div>

                        <h1 className="text-2xl mb-2">{vehicle.marca} - {vehicle.modelo}</h1>

                        <h2 className="text-md">{vehicle.año}</h2>

                        <h2 className="text-lg font-bold">{vehicle.matricula}</h2>
                    </div>
                </header >

                <section key={`${vehicle.id}-section`}
                    className=" pt-5 p-3 pb-5"
                    style={{ backgroundColor: `${vehicle.color}90` }}>

                    <NextITV itvDate={vehicle?.itv} />

                    <div className=" p-1 pl-3 rounded-md">
                        <h2 className="text-gray-100 text-sm">PRESION DE NEUMATICOS</h2>
                        <h2>2.5 - 2.9 bar delante y detras</h2>
                    </div>
                </section>

                <section className=" flex flex-col pt-10 p-5 ">

                    <Link to={`/vehicle/${id}/maintenance`} className="bg-white text-black p-2 rounded-md w-full text-center">+ AÑADIR SERVICIO</Link>

                    <div className="mb-5 mt-8">
                        <h2>HISTORIAL DE SERVICIOS</h2>
                    </div>

                    {vehicle.manteinances.map(manteinance => {
                        const formattedDate = new Date(manteinance.fecha).toISOString().split('T')[0]
                        return (
                            <Link
                                to={`/vehicle/${vehicle._id}/maintenance-detail/${manteinance._id}`}
                                key={manteinance._id}
                                className=" mb-5 flex justify-between opacity-80 hover:opacity-100 transition-opacity"
                            >
                                <div className="flex flex-col text-white mb-4">
                                    <h2 className="text-sm text-gray-300">{formattedDate}</h2>
                                    <h2 className="text-xl">{manteinance.descripcion}</h2>
                                </div>
                                <div className="flex items-center gap-5 mr-3">
                                    <FileCheck />
                                    <ChevronRight />
                                </div>
                            </Link>
                        )
                    })}

                </section>

            </div >
        </div>)
}

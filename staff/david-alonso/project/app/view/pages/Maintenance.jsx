import { Link, useParams, useNavigate } from "react-router"
import { logic } from "../../logic";

export function Maintenance() {
    const { id } = useParams()
    const navigate = useNavigate()

    const handleMaintenanceSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event
            const {
                fecha: { value: fecha },
                descripcion: { value: descripcion },
                texto: { value: texto },

            } = form

            logic.registerManteinance(id, new Date(fecha), descripcion, texto)
                .then(() => {
                    form.reset()
                    navigate(`/vehicle/${id}`)
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


    return <div className="relative min-h-screen">
        {/* Capa con desenfoque sobre el fondo */}
        <div className="absolute inset-0 backdrop-blur-2xl z-0"></div>

        <div className="relative z-10 flex flex-col p-5 justify-between min-h-screen">

            <h1 className="text-2xl mt-5">AÑADIR SERVICIO</h1>

            <div className="flex justify-center mt-auto">
                <form onSubmit={handleMaintenanceSubmit}>

                    <div className="pb-25 ">
                        <label htmlFor="fecha">Fecha</label>
                        <input type="date" id="fecha" />

                        <label htmlFor="descripcion">Descripcion</label>
                        <input type="text" id="descripcion" />

                        <label htmlFor="texto">Texto</label>
                        <textarea name="texto" id="texto" className="w-full bg-gray-300 border border-gray-400 rounded-lg p-5 pb-20"></textarea>
                    </div>
                    <button type="submit" >AÑADIR</button>

                    <div className="flex justify-center">
                        <Link to={`/vehicle/${id}`} className='underline text-white'>CANCELAR</Link>
                    </div>
                </form>
            </div>

        </div >
    </div >
}
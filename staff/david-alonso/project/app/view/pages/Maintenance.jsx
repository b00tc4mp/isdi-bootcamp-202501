import { Link, useParams, useNavigate } from "react-router"
import { logic } from "../../logic";

export function Maintenance() {
    const { id } = useParams();
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

            // const ??? = ????

            logic.registerManteinance(id, new Date(fecha), descripcion, texto)
                .then(() => {
                    form.reset()
                    navigate(`/vehicle/${id}`)  //*******Traerlo de la APP.jsx****** */
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


    return <div className="min-h-screen flex flex-col p-5">

        <h1 className="text-2xl m-5 mt-10">AÑADIR SERVICIO</h1>

        <div className="">
            <form onSubmit={handleMaintenanceSubmit} className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl/30 space-y-4">

                <input type="date" id="fecha" placeholder="Fecha" />

                <input type="text" id="descripcion" placeholder="Descripcion" />

                <textarea name="texto" id="texto" placeholder="Texto" className="w-full border border-gray-400 rounded-lg p-2"></textarea>

                <button type="submit" >AÑADIR</button>

                <div className="flex justify-center">
                    <Link to={`/vehicle/${id}`} className='underline text-black' >CANCEL</Link>
                </div>
            </form>
        </div>

    </div>

}
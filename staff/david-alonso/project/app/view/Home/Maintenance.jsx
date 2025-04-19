import { Link, useParams } from "react-router"
import { logic } from "../../logic";

export function Maintenance({ onAddedMaintenance }) {
    const { id } = useParams();

    const handleMaintenanceSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event
            const {
                fecha: { value: fecha },
                descripcion: { value: descripcion },
                texto: { value: texto },

            } = form
            console.log(texto);


            // const ??? = ????

            logic.registerManteinance(id, new Date(fecha), descripcion, texto)
                .then(() => {
                    form.reset()

                    onAddedMaintenance()
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

                <input type="date" id="fecha" placeholder="Fecha" className="w-full border border-gray-400 rounded-lg p-2 " />

                <input type="text" id="descripcion" placeholder="Descripcion" className="w-full border border-gray-400 rounded-lg p-2 " />

                <textarea name="texto" id="texto" placeholder="Texto" className="w-full border border-gray-400 rounded-lg p-2"></textarea>

                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-800">AÑADIR</button>

                <div className="flex justify-center">
                    <Link to={`/vehicle/${id}`} className='underline text-black' >CANCEL</Link>
                </div>
            </form>
        </div>

    </div>

}
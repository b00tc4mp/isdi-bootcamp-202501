import { useParams } from "react-router"
import { useEffect, useState } from "react"

import { Link } from "react-router"

export const ProfileVehicle = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    // console.log('ProfileVehicle montado')
    // console.log('ID del vehículo:', id)

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        fetch(`http://localhost:8080/vehicles/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                setVehicle(data);
            })
            .catch(error => console.error('Error en fetch:', error));
    }, [id]);

    if (!vehicle) return <p>Cargando...</p>

    console.log('Vehicle:', vehicle)

    return (
        <div className="min-h-screen flex flex-col">
            <header>
                <div key={vehicle.id}
                    className=" pt-15 p-5 opacity-80 "
                    style={{ backgroundColor: vehicle.color }}>

                    <div className='flex justify-start w-full'>
                        <Link to="/">⏪</Link>

                        {/* IMPRIMIR */}
                        <div className='flex ml-70 justify-around w-full'>
                            <Link><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-printer-icon lucide-printer"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" /><rect x="6" y="14" width="12" height="8" rx="1" /></svg></Link>

                            {/* COMPARTIR */}
                            <Link><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share2-icon lucide-share-2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg></Link>

                            {/* EDITAR */}
                            <Link><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-line-icon lucide-pencil-line"><path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" /><path d="m15 5 3 3" /></svg></Link>
                        </div>
                    </div>


                    <h1 className="text-lg font-bold mb-5">{vehicle.marca} - {vehicle.modelo}</h1>

                    <h1>{vehicle.año}</h1>

                    <h2 className="text-lg font-bold">{vehicle.matricula}</h2>
                </div>
            </header>

            <section key={`${vehicle.id}-section`}
                className=" pt-10 p-5 opacity-60 "
                style={{ backgroundColor: vehicle.color }}>

                <h2>?????</h2>

                <h2>?????</h2>

                <h2>?????</h2>

            </section>

            <section className=" pt-10 p-5 mb-5 opacity-60 ">

                <button type="button" className="bg-white text-black w-full mb-5 rounded-md">+ AÑADIR SERVICIO</button>

                <h2>HISTORIAL DE SERVICIOS</h2>

                <h2>?????</h2>

                <h2>?????</h2>

            </section>

        </div>
    )
}

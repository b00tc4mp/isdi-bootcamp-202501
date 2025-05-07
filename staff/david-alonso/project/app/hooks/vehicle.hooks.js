import { useEffect, useState } from "react"

export const useVehicle = (id) => {
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        if (id) {
            const token = sessionStorage.getItem('token');

            fetch(`${import.meta.env.VITE_API_URL}/vehicles/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then(vehicle => {

                    fetch(`${import.meta.env.VITE_API_URL}/manteinances/${id}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then(res => {
                            if (!res.ok) throw new Error(`HTTP ${res.status}`);
                            return res.json();
                        })
                        .then(manteinances => {
                            const vehicleWithManteinances = {
                                ...vehicle,
                                manteinances
                            }

                            setVehicle(vehicleWithManteinances);
                        })
                        .catch(error => console.error('Error en fetch:', error));

                })
                .catch(error => console.error('Error en fetch:', error));
        }
    }, [id]);

    return vehicle
}
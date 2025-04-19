import { useEffect, useState } from "react"

export const useVehicle = (id) => {
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        if (id) {
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
        }
    }, [id]);

    return vehicle
}
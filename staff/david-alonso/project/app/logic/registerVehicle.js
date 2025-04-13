import { errors, validate } from '../../com'

const { SystemError } = errors

// Funcion para Registrar al registro
export const registerVehicle = (marca, modelo, año, matricula, km, itv) => {
    validate.text(marca, 'marca')
    validate.text(modelo, 'modelo')
    validate.number(año, 'año')
    validate.text(matricula, 'matricula')
    validate.number(km, 'km')
    validate.date(itv, 'itv')

    return fetch(`http://localhost:8080/vehicles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ marca, modelo, año, matricula, km, itv })
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            console.log(response.status)

            if (response.status === 201)
                return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}
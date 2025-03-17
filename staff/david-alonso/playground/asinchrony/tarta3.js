// TARTA DE QUESO

// 3ª ITERACION SIGUIENDO UN ORDEN CON " PROMESAS "

// LOS PASOS TIENEN SENTIDO Y TIEMPOS

// 1º APARECEN TODOS LOS PASOS 
// 2º APARECEN LOS AVANCES CON SU TIEMPO

const setTimeoutPromised = millis => new Promise(resolve => setTimeout(resolve, millis))

// 1
const base = () => {
    console.log('1º PASO = BASE')

    return setTimeoutPromised(3000) // TIEMPO QUE TARDA EN APARECER DESDE QUE CARGA EN COLA ** ASINCRONO **

        .then(() => {
            console.log('MEZCLO LAS GALLETAS Y LA MANTEQUILLA. METO LA BASE EN LA NEVERA')
        })
}

// 2
const crema = () => {
    console.log('2º PASO = CREMA')

    return setTimeoutPromised(3000)
        .then(() => {
            console.log('BATO TODOS LOS INGREDIENTES, HECHO LA CREMA EN EL MOLDE')
        })
}

// 3
const horneado = () => {
    console.log('3º PASO = HORNEARDO ')

    return setTimeoutPromised(3000)
        .then(() => {
            console.log('METO LA TARTA AL HORNO 60 MINUTOS')
        })
}

// 4
const disfrutar = () => {
    console.log('4º PASO = DISFRUTAR')

    return setTimeoutPromised(5000)
        .then(() => {
            console.log('UNA VEZ FRIA LA TARTA, DISFRUTA DE SU SABOR VICTOR')
        })
}

// START  ** 1ª FUNCION A LA QUE LLAMAMOS
base()
    .then(() => crema())
    .then(() => horneado())
    .then(() => disfrutar())

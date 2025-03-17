// TARTA DE QUESO

// 2ª ITERACION CON UN ORDEN

// LOS PASOS TIENEN SENTIDO Y TIEMPOS

// 1º APARECEN TODOS LOS PASOS 
// 2º APARECEN LOS AVANCES CON SU TIEMPO

// 1
const base = () => {
    console.log('1º PASO = BASE')

    crema() // LLAMAMOS A LA SIGUIENTE FUNCION ** SINCRONO **

    setTimeout(() => {
        console.log('MEZCLO LAS GALLETAS Y LA MANTEQUILLA. METO LA BASE EN LA NEVERA')

    }, 2000) // TIEMPO QUE TARDA EN APARECER DESDE QUE CARGA EN COLA ** ASINCRONO **
}

// 2
const crema = () => {
    console.log('2º PASO = CREMA')

    horneado()

    setTimeout(() => {
        console.log('BATO TODOS LOS INGREDIENTES, HECHO LA CREMA EN EL MOLDE')

    }, 4000)
}

// 3
const horneado = () => {
    console.log('3º PASO = HORNEARDO ')

    disfrutar()
    setTimeout(() => {
        console.log('METO LA TARTA AL HORNO 60 MINUTOS')

    }, 6000)
}

// 4
const disfrutar = () => {
    console.log('4º PASO = DISFRUTAR')

    setTimeout(() => {
        console.log('UNA VEZ FRIA LA TARTA, DISFRUTA DE SU SABOR VICTOR')

    }, 9000)
}

// START  ** 1ª FUNCION A LA QUE LLAMAMOS
base()




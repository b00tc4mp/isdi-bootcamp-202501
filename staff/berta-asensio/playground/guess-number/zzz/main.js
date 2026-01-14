
console.clear()

var Oportunidades = 0
var oportunidadesMaximas = 10


/*PC
-El ordenador tiene que crear un número random entre 0 y 100.
-Este número debemos guardarlo en una variable.
Creamos una variable (numeroCreado) donde guardamos la función con los rangos.
*/
var numeroCreado = crearNumeroAleatorio(0, 100)
var numeroJugador = ''

function crearNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

//console.log(numeroCreado)

/*
-Debemos crear una función para que pregunte al usuario un número del 1 al 100
-Si el numero no está bien puesto, volveremos a preguntar.
-Si el numero está bien puesto, sumaremos contador oportunidades y pasaremos al flujo de juego.
*/
function preguntarNumero() {
    numeroJugador = parseInt(prompt('Introduzca un número del 0 al 100'))

    if(isNaN (numeroJugador) || numeroJugador < 0 || numeroJugador > 100) {
        console.log('Número erróneo. Porfabor, introduzca un nuevo número.')
        return preguntarNumero()
        
    }else{
        Oportunidades++
        flujoJuego(numeroJugador)
    }
}

/*
Funcion para el flujo del juego
*/
function flujoJuego() {

    var intervaloNumeros = Math.abs(numeroCreado - numeroJugador)
    var oportunidadesRestantes = oportunidadesMaximas - Oportunidades
    
    if (intervaloNumeros <= 100 && intervaloNumeros > 50) {
        console.log('Estás Helado. Tu número está a más de 50 números de diferencia. Te quedan ' + oportunidadesRestantes + ' oportunidades.')
        
    } else if (intervaloNumeros <= 50 && intervaloNumeros > 30) {
        console.log('Estás frio. Te quedan ' + oportunidadesRestantes + ' oportunidades.')

    }else if (intervaloNumeros <= 30 && intervaloNumeros > 20) {
        console.log('Estás templado. Te quedan ' + oportunidadesRestantes + ' oportunidades.')
        
    }else if (intervaloNumeros <= 20 && intervaloNumeros > 10) {
        console.log('¡Caliente!. Te quedan ' + oportunidadesRestantes + ' oportunidades.')
        
    }else if (intervaloNumeros <= 10 && intervaloNumeros > 5) {
        console.log('¡Muy Caliente, casi lo tienes!. Te quedan ' + Oportunidades + ' oportunidades.')

    }else if (intervaloNumeros <= 5 && intervaloNumeros >= 1) {
        console.log('¡Te quemas!. Te quedan ' + oportunidadesRestantes + ' oportunidades.') 
        
    }else {
        console.log('¡Felicidades! Has acertado el número.')
        return
    }

    if(Oportunidades < oportunidadesMaximas) {
        preguntarNumero()

    } else {
        console.log('Se acabaron las oportunidades. El número era ' + numeroCreado)
    }
}   

preguntarNumero()
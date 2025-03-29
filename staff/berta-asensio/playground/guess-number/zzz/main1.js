
console.clear()

//DATA
var oportunidades = 0
var oportunidadesMaximas = 4

var numeroCreado = 0
var numeroJugador = ''
var intervaloNumeros = 0



//LOGIC

function numeroAleatorio() {
    numeroCreado = crearNumeroAleatorio(0,100)
}

function crearNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min)

}

function preguntarNumero(){
   
    if(isNaN (numeroJugador) || numeroJugador < 0 || numeroJugador > 100) {
        throw new Error ('Número erróneo. Porfabor, introduzca un nuevo número.')

    }else{
        oportunidades++
        flujoJuego()
    }
}

function flujoJuego() {
    intervaloNumeros = Math.abs(numeroCreado - numeroJugador)
    var oportunidadesRestantes = oportunidadesMaximas - oportunidades

    if (intervaloNumeros <= 100 && intervaloNumeros > 50) {
        alert('Estás Helado. Tu número está a más de 50 números de diferencia. Te quedan ' + oportunidadesRestantes + ' oportunidades.')
        
    } else if (intervaloNumeros <= 50 && intervaloNumeros > 30) {
        alert('Estás frio. Te quedan ' + oportunidadesRestantes + ' oportunidades.')

    }else if (intervaloNumeros <= 30 && intervaloNumeros > 20) {
        alert('Estás templado. Te quedan ' + oportunidadesRestantes + ' oportunidades.')
        
    }else if (intervaloNumeros <= 20 && intervaloNumeros > 10) {
        alert('¡Caliente!. Te quedan ' + oportunidadesRestantes + ' oportunidades.')
        
    }else if (intervaloNumeros <= 10 && intervaloNumeros > 5) {
        alert('¡Muy Caliente, casi lo tienes!. Te quedan ' + oportunidadesRestantes + ' oportunidades.')

    }else if (intervaloNumeros <= 5 && intervaloNumeros >= 1) {
        alert('¡Te quemas!. Te quedan ' + oportunidadesRestantes + ' oportunidades.') 
        
    }else if (intervaloNumeros === 0) {
        alert('¡Felicidades! Has acertado el número.')
        reiniciarJuego()
        
    }else {
        throw new Error ('Algo va mal')
    }

    verificarOportunidades()
}


function verificarOportunidades() {
    if(oportunidades < oportunidadesMaximas) {
        segundoPaso()

    } else {
        alert('Se acabaron las oportunidades. El número era ' + numeroCreado)
        reiniciarJuego()
    }
}

function reiniciarJuego() {
    var reiniciar = prompt ('Quieres volver a jugar? si (s) / no (n)')
    reiniciar = reiniciar.toLowerCase()

    if(reiniciar === 's') {
        oportunidades = 0
        primerPaso()
        segundoPaso()

    } else if (reiniciar !== 's' && reiniciar !== 'n') {
        alert ('Caracter mal introducido. Vuelva a probar')
        reiniciarJuego()
        
    } else {
        alert('¡Hasta otra!')
    }
}

//INTERFACE

function primerPaso() {
    try {
        numeroAleatorio()
        console.log(numeroCreado)       

    } catch(error) {
        alert(error.message)
    }
}

function segundoPaso() {
    try{
        numeroJugador = parseInt(prompt('Introduzca un número del 0 al 100'))
        preguntarNumero(numeroJugador)
        

    } catch(error) {
        alert('Número erróneo. Porfabor, introduzca un nuevo número.')
        //alert(error.message)
        segundoPaso()
    }
}

function dinamicaJuego() {
    try{
        flujoJuego()

    } catch(error) {
        alert('Algo va mal')
    }
}

function repetirJuego() {
    try {
        reinicializar()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

primerPaso()
segundoPaso()
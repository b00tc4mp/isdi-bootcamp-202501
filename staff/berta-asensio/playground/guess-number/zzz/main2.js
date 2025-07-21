

var data = {}
var logic = {}
var interface = {}


console.clear()

//DATA
data.oportunidades = 0
data.oportunidadesMaximas = 4

data.numeroCreado = 0
data.numeroJugador = ''
data.intervaloNumeros = 0


//LOGIC

logic.numeroAleatorio = function () {
    data.numeroCreado = logic.crearNumeroAleatorio(0,100)
}

logic.crearNumeroAleatorio = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min)

}

logic.preguntarNumero = function(){
   
    if(isNaN (data.numeroJugador) || data.numeroJugador < 0 || data.numeroJugador > 100) {
        throw new Error ('Número erróneo. Porfabor, introduzca un nuevo número.')

    }else{
        data.oportunidades++
        logic.flujoJuego()
    }
}
//esta parte es interfaz
logic.flujoJuego = function () {
    data.intervaloNumeros = Math.abs(data.numeroCreado - data.numeroJugador)
    var oportunidadesRestantes = data.oportunidadesMaximas - data.oportunidades

    if (data.intervaloNumeros <= 100 && data.intervaloNumeros > 50) {
        alert('Estás Helado. Tu número está a más de 50 números de diferencia. Te quedan ' + oportunidadesRestantes + ' oportunidades.')
        
    } else if (data.intervaloNumeros <= 50 && data.intervaloNumeros > 30) {
        alert('Estás frio. Te quedan ' + oportunidadesRestantes + ' oportunidades.')

    }else if (data.intervaloNumeros <= 30 && data.intervaloNumeros > 20) {
        alert('Estás templado. Te quedan ' + oportunidadesRestantes + ' oportunidades.')
        
    }else if (data.intervaloNumeros <= 20 && data.intervaloNumeros > 10) {
        alert('¡Caliente!. Te quedan ' + oportunidadesRestantes + ' oportunidades.')
        
    }else if (data.intervaloNumeros <= 10 && data.intervaloNumeros > 5) {
        alert('¡Muy Caliente, casi lo tienes!. Te quedan ' + oportunidadesRestantes + ' oportunidades.')

    }else if (data.intervaloNumeros <= 5 && data.intervaloNumeros >= 1) {
        alert('¡Te quemas!. Te quedan ' + oportunidadesRestantes + ' oportunidades.') 
        
    }else if (data.intervaloNumeros === 0) {
        alert('¡Felicidades! Has acertado el número.')
        logic.reiniciarJuego()
        
    }else {
        throw new Error ('Algo va mal')
    }

    logic.verificarOportunidades()
}


logic.verificarOportunidades = function () {
    if(data.oportunidades < data.oportunidadesMaximas) {
        interface.segundoPaso()

    } else {
        alert('Se acabaron las oportunidades. El número era ' + data.numeroCreado)
        logic.reiniciarJuego()
    }
}

logic.reiniciarJuego = function () {
    var reiniciar = prompt ('Quieres volver a jugar? si (s) / no (n)')
    reiniciar = reiniciar.toLowerCase()

    if(reiniciar === 's') {
        data.oportunidades = 0
        interface.primerPaso()
        interface.segundoPaso()

    } else if (reiniciar !== 's' && reiniciar !== 'n') {
        alert ('Caracter mal introducido. Vuelva a probar')
        reiniciarJuego()        
        
    } else {
        alert('¡Hasta otra!')
    }
}

//INTERFACE

interface.primerPaso = function () {
    try {
        logic.numeroAleatorio()
        console.log(data.numeroCreado)       

    } catch(error) {
        alert(error.message)
    }
}

interface.segundoPaso = function () {
    try{
        data.numeroJugador = parseInt(prompt('Introduzca un número del 0 al 100'))
        logic.preguntarNumero(data.numeroJugador)
        

    } catch(error) {
        alert('Número erróneo. Porfabor, introduzca un nuevo número.')
        //alert(error.message)
        interface.segundoPaso()
    }
}

interface.dinamicaJuego = function () {
    try{
        logic.flujoJuego()

    } catch(error) {
        alert('Algo va mal')
    }
}

interface.repetirJuego = function () {
    try {
        reinicializar()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

interface.primerPaso()
interface.segundoPaso()
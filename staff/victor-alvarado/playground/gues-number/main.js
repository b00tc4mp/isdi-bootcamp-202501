
var data = {}
var logic = {}
var interface = {}

data.intentos = 10 // Numero de intentos //Data

logic.crearNumeroAleatorio = function() {
    return Math.floor(Math.random() * 100) + 1 // Crear un número aleatorio del 1 al 100 // Logic
}

logic.inicioJuego = function() {  //Logic
    var hasGanado = false // La variale has ganado es false, porque ahun no has ganado.
    var numeroAleatorio = logic.crearNumeroAleatorio() // numero aleatorio es = que la funcion crear numero y llama a la funcion()

    while (data.intentos > 0 && !hasGanado) {
        var numeroDelUsuario = interface.pedirNumero() // variable numero del usuario es = que pedir numero y llama a la funcion()

        if (numeroDelUsuario === null) { // Si el numero de ususario es = null saldra una alerta.
            alert("Juego cancelado")
            return
        }

        hasGanado = logic.compararRangos(numeroAleatorio, numeroDelUsuario) // compara el numero que ha introducido el usuario, con el numero aleatorio
    }

    if (!hasGanado) { // si no has ganado muestra una alerta
        alert("Has perdido. El número era " + numeroAleatorio)
    }
}

    interface.pedirNumero = function  () { //interfaz
    var numeroIngresado // variable con el lunero ingresado de el usuario

    while (true) { // bucle while 
        var entrada = prompt("Inserte un número del 1 al 100") //variable entrada muestra una ventana al usuario,

        if (entrada === null) return null // si la entrada

        numeroIngresado = parseInt(entrada, 10) // Se utiliza parseInt para pasar de string a numero.

        if (numeroIngresado >= 1 && numeroIngresado <= 100) { // si el numero ingresado es mayor o igual a 1 o menor o igual que 100
            return numeroIngresado
        } else {
            alert("Introduce un número válido entre 1 y 100")
        }
    }
}

    logic.compararRangos = function (numeroAleatorio, numeroDelUsuario) { //logic
    var diferencia = numeroAleatorio - numeroDelUsuario // calculamos la diferencia restando numero aleatorio - numero de usuario.

    if (diferencia === 0) { // si la diferencia es = a 0 has ganado.
        alert("¡Has ganado!")
        return true
    }

    if (diferencia > -5 && diferencia < 5) { // calculamos los rangos de el numero que ha puesto el usuario, y creamos una alerta.
        alert("Muy caliente")
    } else if (diferencia > -10 && diferencia < 10) {
        alert("Caliente")
    } else if (diferencia > -20 && diferencia < 20) {
        alert("Tibio")
    } else if (diferencia > -30 && diferencia < 30) {
        alert("Templado")
    } else if (diferencia > -50 && diferencia < 50) {
        alert("Frío")
    } else {
        alert("Muy frío")
    }

    data.intentos-- // restamos intentos cada vez.

    return false
}

    logic.inicioJuego() // se llama a la funcion inicio juego. //interfaz

//Datos
var intentos = 10 //Numero de intentos

// Logica


function crearNumeroAleatorio() {
   try {
    return Math.floor(Math.random() * 100) + 1
   } catch (error) {
       console.error("error al generar el numero aleatorio:", error)
       return null
   }    
}

function compararRangos(numeroAleatorio, numeroDelUsuario) {
try{
    var diferencia = numeroAleatorio - numeroDelUsuario

    if (diferencia === 0) {
        alert("Has ganado!")
        return true
    }

    if (diferencia > -5 && diferencia < 5) {
        alert("Muy caliente")
    } else if (diferencia > -10 && diferencia < 10) {
        alert("Caliente")
    } else if (diferencia > -20 && diferencia < 20) {
        alert("tivio")
    } else if (diferencia > -30 && diferencia < 30) {
        alert("templado")
    } else if (diferencia > -50 && diferencia > 50) {
        alert("frio")
    } else {
        alert("muy frio")
    }

    intentos--
    return false
    } catch (error) {
        throw new Error("Error al comparar los numeros: " + error.message)
    }
}    

//Interfaz de usuario

function mostrarAlerta(mensaje) {
    alert(mensaje)
}

function pedirNumero() {
 try {
    var numeroIngresado

while (true) {
        var entrada = prompt("Inserte un numero del 0 al 100")

        if (entrada === null)
            return null

        numeroIngresado = parseInt(entrada, 10)

if (isNaN(numeroIngresado)) {
   mostrarAlerta("el valor ingresado no es un numero valido")
   continue
}
 if (numeroIngresado >= 1 && numeroIngresado <= 100) {
     return numeroIngresado
 } else {
    mostrarAlerta("introduce un numero valido")
 }
}
 } catch (error) {
  mostrarAlerta("error al ingresar el numero")
   console.error(error)
   return null
 }

}

function inicioJuego() {
 try {
    var hasGanado = false
    var numeroAleatorio = crearNumeroAleatorio()

 if (numeroAleatorio === null) {
   throw new Error("no se ha generado el numero aleatorio")
 }
    while (intentos > 0 && !hasGanado) {
    
        var numeroDelUsuario = pedirNumero()

    if (numeroDelUsuario === null) {
        mostrarAlerta("juego cancelado")
        return
    }
    hasGanado = compararRangos(numeroAleatorio, numeroDelUsuario)
}
 if (!hasGanado) {
    mostrarAlerta("has perdido. el numero era " + numeroAleatorio)
 }
 } catch (error) {
   mostrarAlerta("hay un error en el juego" + error.message)
   console.error(error)
 }
}

 inicioJuego()



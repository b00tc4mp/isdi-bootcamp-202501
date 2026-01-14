//NO FUNCIONA 

const interface = {
    primerPaso() {
        try {
            logic.crearNumeroAleatorio()
            console.log(data.numeroCreado)

        } catch (error) {
            console.error(error)

            alert(error.message) 
        }
    },

    segundoPaso() {
        try {
            data.numeroJugador = parseInt(prompt('Introduzca un número del 0 al 100'))
            logic.crearNumeroJugador(data.numeroJugador)
        } catch (error) {
            console.error(error)

            alert(error.message)

            this.segundoPaso()
        }
    },

    dinamicaJuego() {
        try {
            const estado = logic.flujoJuego()

            if(estado) {
                alert(estado)
                this.reinicioJuego()
            } else {
                alert(`${data.temperaturaIntervalo}. Te quedan ${data.oportunidadesRestantes} oportunidades.\n Números dichos: ${data.numerosDichos}, `)
                this.segundoPaso()
            }
        
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },

    reinicioJuego() {
        try {
            var reiniciar = prompt ('Quieres volver a jugar? si (s) / no (n)')
            reiniciar = reiniciar.toLowerCase()

            if(reiniciar === 's') {
                this.primerPaso()
                this.segundoPaso()
                this.dinamicaJuego()
            } else {
                alert('¡Adiós!. Gracias por jugar.')
            }

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
}

interface.primerPaso()
interface.segundoPaso()
interface.dinamicaJuego()




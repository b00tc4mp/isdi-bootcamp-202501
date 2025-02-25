//NO FUNCIONA 

const data = {
    
    oportunidades: 0,
    oportunidadesMaximas: 10,
    oportunidadesRestantes: '',
    intervaloNumeros: 0,
    min: 0,
    max:100,

    numeroCreado: -1,
    numeroJugador: '',
    numerosDichos: [],
    temperaturaIntervalo: '',
    temperatura: {
        HELADO: 'Estás Helado',
        FRIO: 'Estás frio',
        TEMPLADO: 'Estás templado',
        CALIENTE: '¡Caliente!',
        MUY_CALIENTE: '¡Muy Caliente!',
        QUEMA: '¡Te quemas!'
    }
}

const logic = {
    crearNumeroAleatorio() {
        data.numeroCreado = Math.floor(Math.random() * (data.max - data.min) + data.min)
    },

    crearNumeroJugador() {
        if(isNaN (data.numeroJugador) || data.numeroJugador < 0 || data.numeroJugador > 100) {
            throw new Error ('Número erróneo. Porfabor, introduzca un nuevo número.') 
        }
    },

    flujoJuego() {
        data.intervaloNumeros = Math.abs(data.numeroCreado - data.numeroJugador)
        data.oportunidades++
        data.oportunidadesRestantes = data.oportunidadesMaximas - data.oportunidades
        
        if (data.intervaloNumeros <= 100 && data.intervaloNumeros > 50) {
            data.temperaturaIntervalo = data.temperatura.HELADO
        } else if (data.intervaloNumeros <= 50 && data.intervaloNumeros > 30) {
            data.temperaturaIntervalo = data.temperatura.FRIO   
        }else if (data.intervaloNumeros <= 30 && data.intervaloNumeros > 20) {
            data.temperaturaIntervalo = data.temperatura.TEMPLADO
        }else if (data.intervaloNumeros <= 20 && data.intervaloNumeros > 10) {
            data.temperaturaIntervalo = data.temperatura.CALIENTE           
        }else if (data.intervaloNumeros <= 10 && data.intervaloNumeros > 5) {
            data.temperaturaIntervalo = data.temperatura.MUY_CALIENTE  
        }else if (data.intervaloNumeros <= 5 && data.intervaloNumeros >= 1) {
            data.temperaturaIntervalo = data.temperatura.QUEMA
        }else{
            throw new Error ('Algo va mal')
        }

        

        if(data.intervaloNumeros === 0) {
            return 'Has ganado'
        } else if (data.oportunidades >= data.oportunidadesMaximas) {
            return 'Se acabaron las oportunidades. El número era ' + data.numeroCreado
        } else {
            return null
        }
           
    },

    reiniciarJuego() {

        data.oportunidades = 0;
        data.numerosDichos = [];
        data.numeroCreado = -1;
        data.numeroJugador = '';
        data.temperaturaIntervalo = '';
        console.log('Juego reiniciado');
        }
    }


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




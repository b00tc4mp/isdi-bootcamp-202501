const logic = {

    helper: {
        ganado() {
            return (data.intervaloNumeros === 0)
        },

        perdido() {
            return (data.oportunidades >= data.oportunidadesMaximas)
        }
    },

    crearNumeroAleatorio() {
        data.numeroCreado = Math.floor(Math.random() * (data.max - data.min) + data.min)
    },

    crearNumeroJugador(numeroJugador) {

        if(isNaN (numeroJugador) || numeroJugador < 0 || numeroJugador > 100) {
            throw new Error ('error.message') 
        }
        data.numeroJugador = numeroJugador
        data.intervaloNumeros = Math.abs(data.numeroCreado - data.numeroJugador)
        data.numerosDichos.push(data.numeroJugador)


        
        data.oportunidades++
        data.oportunidadesRestantes = data.oportunidadesMaximas - data.oportunidades

        if (data.intervaloNumeros <= 100 && data.intervaloNumeros > 50) {
            data.temperatura = 'Estás Helado' //data.temperatura.HELADO
        } else if (data.intervaloNumeros <= 50 && data.intervaloNumeros > 30) {
            data.temperatura = 'Estás Frío' //data.temperatura.FRIO   
        }else if (data.intervaloNumeros <= 30 && data.intervaloNumeros > 20) {
            data.temperatura = 'Estás Templado'//data.temperatura.TEMPLADO
        }else if (data.intervaloNumeros <= 20 && data.intervaloNumeros > 10) {
            data.temperatura = '¡Caliente!'//data.temperatura.CALIENTE           
        }else if (data.intervaloNumeros <= 10 && data.intervaloNumeros > 5) {
            data.temperatura = '¡Muy Caliente!'//data.temperatura.MUY_CALIENTE  
        }else if (data.intervaloNumeros <= 5 && data.intervaloNumeros >= 1) {
            data.temperatura = '¡Te quemas!'// data.temperatura.QUEMA
        }else{
            throw new Error ('Algo va mal')
        }

        if(this.helper.ganado() || this.helper.perdido()) throw new Error ('Se acabó el juego.')

    },

    getStatus() {
        const {oportunidadesRestantes, temperatura, numerosDichos, numeroCreado} = data

        return {
            oportunidadesRestantes,
            temperatura,
            numerosDichos,
            numeroCreado,
            hasGanado: this.helper.ganado(),
            hasPerdido: this.helper.perdido()
        }  

    },

    reiniciarJuego() {

        data.oportunidades = 0;
        data.numerosDichos = [];
        data.numeroCreado = -1;
        data.numeroJugador = '';
        data.temperatura = '';
        }
    }

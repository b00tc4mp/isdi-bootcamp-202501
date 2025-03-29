var logic = {

    numeroAleatorio: function () {
        data.numeroCreado = handleNumeroAleatorio(0,100)
    },
    
    handleNumeroAleatorio: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    
    },
    
    preguntarNumero: function(){
    
        data.numeroJugador = parseInt(numberInput)
       
        if(isNaN (data.numeroJugador) || data.numeroJugador < 0 || data.numeroJugador > 100) {
            throw new Error ('Número erróneo. Porfabor, introduzca un nuevo número.')
    
        }else{
            data.oportunidades++
            flujoJuego()
        }
    }
    ,
    //esta parte es interfaz
    flujoJuego: function () {
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
    },
    
    
    verificarOportunidades: function () {
        if(data.oportunidades < data.oportunidadesMaximas) {
            segundoPaso()
    
        } else {
            alert('Se acabaron las oportunidades. El número era ' + data.numeroCreado)
            reiniciarJuego()
        }
    },
    
    reiniciarJuego: function () {
        var reiniciar = prompt ('Quieres volver a jugar? si (s) / no (n)')
        reiniciar = reiniciar.toLowerCase()
    
        if(reiniciar === 's') {
            data.oportunidades = 0
            primerPaso()
            segundoPaso()
    
        } else if (reiniciar !== 's' && reiniciar !== 'n') {
            alert ('Caracter mal introducido. Vuelva a probar')
            reiniciarJuego()        
            
        } else {
            alert('¡Hasta otra!')
        }
    }


}


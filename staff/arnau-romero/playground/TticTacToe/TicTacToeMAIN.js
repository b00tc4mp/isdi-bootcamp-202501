/* 
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  PLANTEAMIENTO DEL PROGRAMA TRES EN RAYA: 
1- El juego empezara imprimiendo el tablero vacio, 
2- El jugador selecionara donde poner una "x",
3- Imprimir el nuevo tablero con una x en la posicion seleccionada por el jugador
4- otro jugador tambien tiene que introducir un circulo.
5- se imprimira le tablero con el circulo y la cruz en las posiciones elegidas por los jugadores.
6- (*ya nivel dificil) cuando tres circulos o tres cruces esten seguidas el juego acabara y se imprimira quien es el ganador.
7- (**ya nivel muy dificil) se resete el juego cuando acabe.
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/


var celdas = [[],[],[]]
var maximoColumnas = 3
var maximoFilas= 3
var partidaFinalizada = false 
var intentos = 0
var maximoIntentos = 9
var noQuieroJugar = false 

//Empiezo generando tablero vacio:
for (var i = 0; i < maximoColumnas; i++) {
    for (var j = 0; j < maximoFilas; j++) {
        //console.log(i, j)
        celdas[i][j] = '-'
    }
}


 // Funcion para reiniciar tablero
function reiniciarTablero(){
    for (var i = 0; i < maximoColumnas; i++) {
     for (var j = 0; j < maximoFilas; j++) {
        //console.log(i, j)
        celdas[i][j] = '-'
    }
}
    partidaFinalizada = false 
    intentos = 0
    juegoEnAutomatico() // Despues de restablecer el tablero ejecutamos el juego en auto de nuevo.
}

// Funcion para insertar cruces en el tablero.
function insertarCruz(){
    alert("Turno del jugador que inserta 'x' "+ '\n'+ 'Estado del tablero:'+ '\n'+ '[' + celdas[0][0] +']' + '[' + celdas[0][1] + ']'  + '[' + celdas[0][2] + ']'  + "\n" + '[' + celdas[1][0] + ']' +  '[' + celdas[1][1] + ']' + '[' + celdas[1][2] + ']' + "\n" + '[' + celdas[2][0] + ']' +  '[' + celdas[2][1] + ']' + '[' + celdas[2][2] + ']'  )
    var i = prompt("cuantas columnas a mover?")
    var j = prompt("cuantas filas a mover?")
    
    if(celdas[i][j] ==='x' || celdas[i][j] === 'o'){
        alert('Ya hay una ficha en esa posicion! Escoja otra por favor.')
        insertarCruz()
    }else if(celdas[i][j] != 'x' || celdas[i][j] != 'o'){
    celdas[i][j] = "x"
    intentos++
    }
   
    alert('Estado del tablero:'+ '\n'+ '[' + celdas[0][0] +']' + '[' + celdas[0][1] + ']'  + '[' + celdas[0][2] + ']'  + "\n" + '[' + celdas[1][0] + ']' +  '[' + celdas[1][1] + ']' + '[' + celdas[1][2] + ']' + "\n" + '[' + celdas[2][0] + ']' +  '[' + celdas[2][1] + ']' + '[' + celdas[2][2] + ']' )
}

// Funcion para insertar redondas en el tablero.
function insertarRedonda(){
    alert("Turno del jugador que inserta 'o' " + "\n" + 'Estado del tablero:'+ '\n'+ '[' + celdas[0][0] +']' + '[' + celdas[0][1] + ']'  + '[' + celdas[0][2] + ']'  + "\n" + '[' + celdas[1][0] + ']' +  '[' + celdas[1][1] + ']' + '[' + celdas[1][2] + ']' + "\n" + '[' + celdas[2][0] + ']' +  '[' + celdas[2][1] + ']' + '[' + celdas[2][2] + ']' )
    var i = prompt("cuantas columnas a mover?")
    var j = prompt("cuantas filas a mover?")
     if(celdas[i][j] ==='x' || celdas[i][j] === 'o'){
        alert('Ya hay una ficha en esa posicion! Escoja otra por favor.')
        insertarRedonda()
    }else if(celdas[i][j] != 'x' || celdas[i][j] != 'o'){
   
    celdas[i][j] = "o"
    intentos++
     }
    alert('Estado del tablero:'+ '\n'+ '[' + celdas[0][0] +']' + '[' + celdas[0][1] + ']'  + '[' + celdas[0][2] + ']'  + "\n" + '[' + celdas[1][0] + ']' +  '[' + celdas[1][1] + ']' + '[' + celdas[1][2] + ']' + "\n" + '[' + celdas[2][0] + ']' +  '[' + celdas[2][1] + ']' + '[' + celdas[2][2] + ']' )
}

// Funcion para revisar si hemos ganado.
function revisarVictoria(){
    // Tenemos que hacer una funcion que revise si hemos ganado, para ganar tienen que haber tres simbolos iguales en posiciones consecutivas, 
    //tanto en vertical como en horizonatl como en diagonal
    
    //Comprobar horizontales
    if( celdas[0][0] == "o" && celdas[0][1] == "o" && celdas[0][2] == "o"){
        alert("player o win")
        partidaFinalizada = true
    }
     if( celdas[1][0] == "o" && celdas[1][1] == "o" && celdas[1][2] == "o"){
        alert("player o win")
          partidaFinalizada = true
    }
     if( celdas[2][0] == "o" && celdas[2][1] == "o" && celdas[2][2] == "o"){
        alert("player o win")
          partidaFinalizada = true
    }
    
    //comprobar verticales
    if( celdas[0][0] == "o" && celdas[1][0] == "o" && celdas[2][0] == "o"){
        alert("player o win")
         partidaFinalizada = true
    }
     if( celdas[0][1] == "o" && celdas[1][1] == "o" && celdas[2][1] == "o"){
        alert("player o win")
          partidaFinalizada = true
    }
     if( celdas[0][2] == "o" && celdas[1][2] == "o" && celdas[2][2] == "o"){
        alert("player o win")
          partidaFinalizada = true
    }
    
    //Comprobar diagonales
     if( celdas[0][0] == "o" && celdas[1][1] == "o" && celdas[2][2] == "o"){
        alert("player o win")
          partidaFinalizada = true
    }
     if( celdas[2][0] == "o" && celdas[1][1] == "o" && celdas[0][2] == "o"){
        alert("player o win")
          partidaFinalizada = true

     }
    //COMPROBAR CRUCES

    //Comprobar horizontales
    if( celdas[0][0] == "x" && celdas[0][1] == "x" && celdas[0][2] == "x"){
        alert("player x win")
         partidaFinalizada = true
    }
     if( celdas[1][0] == "x" && celdas[1][1] == "x" && celdas[1][2] == "x"){
        alert("player x win")
          partidaFinalizada = true
    }
     if( celdas[2][0] == "x" && celdas[2][1] == "x" && celdas[2][2] == "x"){
        alert("player x win")
          partidaFinalizada = true
    }
    
    //comprobar verticales
    if( celdas[0][0] == "x" && celdas[1][0] == "x" && celdas[2][0] == "x"){
        alert("player x win")
         partidaFinalizada = true
    }
     if( celdas[0][1] == "x" && celdas[1][1] == "x" && celdas[2][1] == "x"){
        alert("player x win")
          partidaFinalizada = true
    }
     if( celdas[0][2] == "x" && celdas[1][2] == "x" && celdas[2][2] == "x"){
        alert("player x win")
          partidaFinalizada = true
    }
    
    //Comprobar diagonales
     if( celdas[0][0] == "x" && celdas[1][1] == "x" && celdas[2][2] == "x"){
        alert("player x win")
          partidaFinalizada = true
    }
     if( celdas[2][0] == "x" && celdas[1][1] == "x" && celdas[0][2] == "x"){
        alert("player x win")
          partidaFinalizada = true
         }

         
}

//Funcion para revisar que el tablero no este lleno
function revisarTableroLleno (){
        if(intentos == maximoIntentos && partidaFinalizada == false){
    alert("Habeis empatado!")
    volverAjugar()
    }
}

       

// Funcion para ejecutar el juego en automatico.
function juegoEnAutomatico(){
    do {
    if(partidaFinalizada == false && noQuieroJugar == false){
      insertarCruz()
      revisarVictoria()
      revisarTableroLleno()
    }
    if(partidaFinalizada == false && noQuieroJugar == false){
      insertarRedonda()
      revisarVictoria()
      revisarTableroLleno()
    }
} while (partidaFinalizada != true)

volverAjugar()
}

//Funcion para preguntar si queremos volver a jugar
function volverAjugar(){    
var volverAjugar = prompt("Quieres volver a jugar? s/n ")

if (volverAjugar === 's'){
    reiniciarTablero()
        }
else if(volverAjugar === 'n') {
        alert ('Gracias por jugar')
        noQuieroJugar = true
    
}
    
    
}


juegoEnAutomatico() // Ejecutar el juego en automatico.
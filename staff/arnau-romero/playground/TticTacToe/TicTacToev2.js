/* PLANTEAMIENTO DEL PROGRAMA TRES EN RAYA: 
1- El juego empezara imprimiendo el tablero vacio, 
2- El jugador selecionara donde poner una "x",
3- Imprimir el nuevo tablero con una x en la posicion seleccionada por el jugador
4- otro jugador tambien tiene que introducir un circulo.
5- se imprimira le tablero con el circulo y la cruz en las posiciones elegidas por los jugadores.
6- (*ya nivel dificil) cuando tres circulos o tres cruces esten seguidas el juego acabara y se imprimira quien es el ganador.
7- (**ya nivel muy dificil) se resete el juego cuando acabe. */

//var lineaTablero = "|- - -|\n|- - -|\n|- - -|" //variable de una línea del tablero 
var celdas = [[],[],[]]
var maximoColumnas = 3
var maximoFilas= 3

 for (var i = 0; i < maximoColumnas; i++) {
    for (var j = 0; j < maximoFilas; j++) {
        //console.log(i, j)
        celdas[i][j] = '-'
    }
}
console.log(celdas)

function reiniciarTablero(){ //funcion para imprimir tablero
    for (var i = 0; i < maximoColumnas; i++) {
    for (var j = 0; j < maximoFilas; j++) {
        //console.log(i, j)
        celdas[i][j] = '-'
    }
}
    console.log(celdas)
}

function insertarCruz(){
    var i = prompt("cuantas columnas a mover?")
    var j = prompt("cuantas filas a mover?")
    celdas[i][j] = "x"
    console.log(celdas)
}

function insertarRedonda(){
    var i = prompt("cuantas columnas a mover?")
    var j = prompt("cuantas filas a mover?")
    celdas[i][j] = "o"
    console.log(celdas)
}

function revisarVictoria(){
    // Tenemos que hacer una funcion que revise si hemos ganado, para ganar tienen que haber tres simbolos iguales en posiciones consecutivas, 
    //tanto en vertical como en horizonatl como en diagonal
    
    //Comprobar horizontales
    if( celdas[0][0] == "o" && celdas[0][1] == "o" && celdas[0][2] == "o"){
        alert("player o win")
    }
     if( celdas[1][0] == "o" && celdas[1][1] == "o" && celdas[1][2] == "o"){
        alert("player o win")
    }
     if( celdas[2][0] == "o" && celdas[2][1] == "o" && celdas[2][2] == "o"){
        alert("player o win")
    }
    
    //comprobar verticales
    if( celdas[0][0] == "o" && celdas[1][0] == "o" && celdas[2][0] == "o"){
        alert("player o win")
    }
     if( celdas[0][1] == "o" && celdas[1][1] == "o" && celdas[2][1] == "o"){
        alert("player o win")
    }
     if( celdas[0][2] == "o" && celdas[1][2] == "o" && celdas[2][2] == "o"){
        alert("player o win")
    }
    
    //Comprobar diagonales
     if( celdas[0][0] == "o" && celdas[1][1] == "o" && celdas[2][2] == "o"){
        alert("player o win")
    }
     if( celdas[2][0] == "o" && celdas[1][1] == "o" && celdas[0][2] == "o"){
        alert("player o win")

     }
    //COMPROBAR CRUCES

    //Comprobar horizontales
    if( celdas[0][0] == "o" && celdas[0][1] == "o" && celdas[0][2] == "o"){
        alert("player o win")
    }
     if( celdas[1][0] == "o" && celdas[1][1] == "o" && celdas[1][2] == "o"){
        alert("player o win")
    }
     if( celdas[2][0] == "o" && celdas[2][1] == "o" && celdas[2][2] == "o"){
        alert("player o win")
    }
    
    //comprobar verticales
    if( celdas[0][0] == "x" && celdas[1][0] == "x" && celdas[2][0] == "x"){
        alert("player o win")
    }
     if( celdas[0][1] == "x" && celdas[1][1] == "x" && celdas[2][1] == "x"){
        alert("player o win")
    }
     if( celdas[0][2] == "x" && celdas[1][2] == "x" && celdas[2][2] == "x"){
        alert("player o win")
    }
    
    //Comprobar diagonales
     if( celdas[0][0] == "x" && celdas[1][1] == "x" && celdas[2][2] == "x"){
        alert("player o win")
    }
     if( celdas[2][0] == "x" && celdas[1][1] == "x" && celdas[0][2] == "x"){
        alert("player o win")
         }

         
}


//HAY QUE HACER UNA FUNCION QUE NO TE DEJE PONER UNA FICHA DONDE YA HAYA UNA
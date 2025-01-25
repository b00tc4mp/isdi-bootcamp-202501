console.clear()

var word = "pan" // se declrara una variable con una string "pan"
var matches = [] //se declara una variable matches []

for (var i = 0; i < word.length; i ++) { // bucle for itera sobre la palabra "pan"
    matches[i] = "_" // se añade a matches que es un array vacio el valor de i.

}

var attemps = 0 // variable intentos con valor de 0.
var maxAttemps = 6 // variable de intentos = 6.
var guessCharacter = "" // variable string.


 function printMatches() {  // funcion que imprime las coincidencias del texto. // 
    var matchesSrting = ""
     for (var i = 0; i < matches.length; i++) { //bucle que itera sobre matches "_"
      matchesSrting = matchesSrting + matches[i] + " " //suma de string + matches
     }   
         console.log(matchesSrting)
 }

 function askCharacter() { //funcion  que abre una ventana en el navegador:
      guessCharacter = prompt("character") 
     //funcion que almacena el valor ingresado
}
 
    function checkGuessCharacter() { 
      var characterFound = false // variable con valor false:

    for (var i = 0; i < word.length; i++) { // bucle for itera sobre la palabra "pan".
        if (word[i] === guessCharacter) { // compara character con el indice de "pan"
            matches[i] = word[i]
            characterFound = true
        }
     }  
        
        if ( !characterFound && attemps < maxAttemps) {
          attemps++   
     }
        
 }
    function printStatus() {
        var remainingAttemps = maxAttemps - attemps
           console.log("Tienes " + remainingAttemps + " intentos")

        if ( remainingAttemps === 0) {
            console.log( "Perdiste!")
        } else {
            var hasWON = true
 
            for ( var i = 0; i <  matches.length; i++) {
              if (matches[i] !== word[i]) {
                hasWon = false

              break
         }
                
  }    

            if (hasWon) {
                console.log("HAS GANADO!!")
        
            }
        }
    
    }
      function hasUnderscores() {
       for (var i = 0; i < matches.length; i ++) {
        if (matches[i] === "_") {

            return true
        }
           
       }
          return false
      }

        console.log("Bienvenido al juego!")

     while (attemps < maxAttemps && hasUnderscores()) {

         printMatches()
         askCharacter()
         checkGuessCharacter()
         printStatus()
     }

if (!hasUnderscores ()) {
    console.log( "Has adivinado la palabra!!")
} else if (attemps >= maxAttemps) {

    console.log("Has perdido paquete! La palabra era " + word);
}
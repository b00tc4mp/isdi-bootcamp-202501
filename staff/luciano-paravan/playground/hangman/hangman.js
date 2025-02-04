var word = prompt('Palabra para adivinar?')
var matches = []
var attempts = 0
var maxAttempts = 6
var guessCharacter = ''
var guessedCharacters = 0

for (var i = 0; i < word.length; i++) { //este for es para generar un array que mostrará la cantidad de de caracteres por adivinar y adivinados.
    matches[i] = '_' //en el array matches que estaba vacio lo vamos llenando con '_' segun la longitud de word 
}

function printMatches() { //esta funcion sirve para transformar el array en string y mostrar lo anterior por pantalla
    var matchesString = ''

    for (var j = 0; j < matches.length; j++) //Aca utilizamos el array matches que llenamos previamente transformandolo a string para mostrarlo por pantalla
        matchesString += matches[j] + ' '
    alert(matchesString)
}

function askCharacter() {
    guessCharacter = prompt('Di una letra: ')
}

function checkGuessCharacter() {
    var match = false  //Ponemos esta var  como validacion de v o f porque la usaremos luego porque si es f debemos sumar 1 attemps
    
    for (var k = 0; k < word.length; k++) { //este for itera entre las letras de la palabra 
        if (word[k] === guessCharacter) {   //condicion para ver si la posicion (letra) de la palabra a adivinar coincide con la letra que dijo el usuario
            if (matches[k] === guessCharacter) { //condicion para ver si la letra ya la escribio en otra oportunidad
                alert('You ve already guessed that character')
                match = true
                break //este break te saca del for, si pongo un return me sacaria de la funcion, para que en caso de que la letra exista salga del for y no sume guessedCharacter
            } else { //en el caso de que la letra esté en word y no la hayamos escrito previamente
                matches[k] = guessCharacter //La agrega en la posicion que va en el array matches
                guessedCharacters++ //suma el contador de letras adivinadas, que luego usaremos para comparar su longitud con word
                match = true
            }
        }       
    }
    
    if (match === false){ //si no entra en el if anterior al no encontrarse la letra en la palabra, se valida que es falso 
        attempts++ //entonces sumamos un intento erroneo
    }
}

function hangBody () {
    
}

function winOrNot() { //funcion para validar si se gana o pierde, o si todavia puede seguir jugando
    var winOrLose = false
    if (guessedCharacters === word.length || attempts === maxAttempts) {
        //printMatches()
        winOrLose = true 
    }
    return winOrLose
}

printMatches()

while (!winOrNot()) { //while para repetir las funciones de pedir un caracter siempre que no haya ganado o perdido, checkear si se encuentra el caracter en la palabra e imprimir la palabra con los respectivos aciertos
    alert('You have ' + (maxAttempts - attempts) + ' attempts.')
    askCharacter()
    checkGuessCharacter()
    printMatches()
}

//una vez se sale del while se valida si ganó o perdió 

if (guessedCharacters === word.length) { //valida si gana comparando la longitud de la palabra con el contador de letras acertadas
    alert('You won')
} else { //si pierde
    alert('HANGMAN')
}





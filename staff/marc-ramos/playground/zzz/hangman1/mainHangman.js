console.clear() //limpiar pantalla cada vez que empiece el programa
var word = prompt('Word to guess') //pregunto una palabra al usuario y se guarda en (word)
var matches = [] //creamos array matches para almacenar las letras que pone el usuario y coinciden
var guessLetter = '' //variable para almacenar la letra que da el usuario
var stringMatches = ''
var currentAttempts = 0 //intentos actuales
var maxAttempts = 3 //intentos maximos

for(var i = 0; i < word.length; i++){ //bucle for para que el usuario sepa cuantas letras tiene que poner
    matches[i] = '_' //pone una _ por cada letra de (word) en matches
}

function askCharacter(){ //funcion para preguntar letra
    guessLetter = prompt('Letter please') //pregunta letra a usuario y almacenarla en guessLetter
}

function printMatches(){ //funcion para imprimir por pantalla las letras que coinciden con word
    
        var matchesString = '' // declaramos variable printMatchesString para que matches salga como un string
        for (var k = 0; k < matches.length; k++){ //bucle for para recorrer el array matches
        matchesString += matches[k] + ' ' //la letra que coincide la ponemos en matchesString en la posicion que toca + un espacio
        }
        alert(matchesString) //console.log de matches para imprimir el progreso
}

function checkGuessCharacterMatches(){ //funcion para comparar la letra dada con la palabra a adivinar
        var checkMatch = false //hacemos una variable que se va a chivar cuando coincida la letra o no
    
    for (var j = 0; j < word.length; j++){ //for para recorrer la palabra a adivinar
        if (guessLetter === word[j]){ //si la letra dada coincide con alguna de word
            matches[j] = guessLetter //entonces pondremos la letra en la posicion que recorremos
            checkMatch = true //cambia checkMatch a true pk ha coincidido y no se ejecute el if de abajo
        }

        
    }    
    
    if (checkMatch === false){ //si checkMatch es falso...
        currentAttempts++ //sumamos uno a currentAttempts
        alert('Keep trying')
    }
    
}

function looseOrWin(){ //funcion para que nos imprima si ganamos, perdemos o si seguimos jugando

    stringMatches = '' //reseteamos stringMatches porque ya tenemos valores dentro

    for(var l = 0; l < matches.length; l++){ //bucle para recorrer las letras de matches
        stringMatches += matches[l] //le sumamos a stringMatches las letras que coinciden
    }
    
    if (stringMatches === word){ // si stringMatches es igual a la palabra elegida
        alert('You win!! the word was: ' + word) // muestra 'You win!!'
        
    } else if (currentAttempts === maxAttempts){ //si los intentos actuales son iguales a los maximos
        alert('You loose!') //muestra 'You loose!!'
    }
}
askCharacter()
checkGuessCharacterMatches()
printMatches()
looseOrWin()

while(currentAttempts < maxAttempts && stringMatches !== word){ //si no hemos llegado a los maximos attempts && aun no hemos ganado; ejecuta las funciones
    askCharacter()
    checkGuessCharacterMatches()
    printMatches()
    looseOrWin()
}
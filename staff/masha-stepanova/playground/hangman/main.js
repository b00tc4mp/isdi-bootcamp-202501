
       var word = prompt('Write here your secret word:') // genera una ventana emergente que guarda la palabra escrita como valor de la variable.
       var matches = [] // para guardar los matches de letras que se adivinan.
       var lives = 6 // el máximo número de fallos permitidos
       var guessCharacter = '' // para guardar la letra que usaremos para adivinar
   
       var one = '' // variables que usaremos para dibujar el ahorcado en el caso de fallos- Hay 6, como las vidas.
       var two = ''
       var three = ''
       var four = ''
       var five = ''
       var six = '' 
   
       for (var i = 0; i < word.length; i++) // un bucle que rellena matches de número de barras bajas igual que length de word
       matches[i] = '_'
   
       function printMatches() { // crea una string de caracteres almacenados en matches separados por espacios
           var matchesString = ''
           
           for (var i = 0; i < matches.length; i++) {
               matchesString += matches[i] + ' '
           }
           alert('The secret word is   ' + matchesString)
       }
   
       function askCharacter() { // función que crea una ventana que permite introducir el caracter, almacenado en guessCharacter
       guessCharacter = prompt('Let\s guess a character!')
       }
   
  // let wrongLetter = ''
   function checkGuessCharacterMatches() { // función para saber si existe al menos un match de letra en palabra
       var isFound = false
       
           for (var j = 0; j < word.length; j++) {
                if (guessCharacter.length > 1 && guessCharacter.length < word.length) {
                    alert('Be carefull, you can only introduce one letter. If you want to guess the word, please insert ' + word.length + ' letters.')
                    return false    
                } else if (matches[j] === guessCharacter || wrongLetter[j] === guessCharacter) {
                    alert('Be carefull, this character is already guessed!')
                    return false
                }    
               
                if (guessCharacter == word[j]) {
                   matches[j] = word[j]
                   isFound = true
               } 
           }
       
       if (isFound === false) { // proceso que permite dibujar un ahorcado en función de los fallos y resta las vidas
           switch (lives) {
               case 6:
               one += ' ┌──┐'
               break;
               case 5:
               two += ' |     |'
               break;
               case 4:
               three += ' |   ☹'
               break;
               case 3:
               four += ' |  ⌈⌷⌉'
               break;
               case 2:
               five += ' |    ∆'
               break
               case 1:
               six += '⍊  ⌋ ⌊'
           }
           
           lives--
           wrongLetter += guessCharacter // una ventana con el dibujo del ahorcado
           alert(`The character ${guessCharacter} was not found' 
                   ${one}
                   ${two}
                   ${three}
                   ${four}
                   ${five}
                   ${six}` )
       }
   }
   
   function win() { // una función para saber si el juego ya está ganado o no
       let result = false
       for (var h = 0; h < word.length; h++) {
           if (matches[h] === word[h]) {
               result = true
           } else {
               result = false
               break
           }
       }
       return result
   }
    
   printMatches()
   while (lives > 0 && win() === false) { // entrada al bucle, la condición para entrar: vidas suficientes, que no se haya ganado
   askCharacter()
   
   if (guessCharacter.length === word.length) {
       
       if (guessCharacter === word) {
           lives = 6
           break
       } else {
       lives = 0
       break
       }
   }
       
   checkGuessCharacterMatches()
   
   if (guessCharacter === null || guessCharacter === '') {
       var ask = prompt('Would you like to stop the game?') 
           if (ask !== 'no') {
               alert('See you next time!')
               lives = 0
               break
           }
       }
   
   printMatches()
   }
   
   if (lives > 0) {
       alert('You win, congratulations!')
   } else {
       alert('You\'ve lost, the secret word was ' + word) 
   }
   
   let repeat = prompt('Would you like to play again? PLease, answer yes or not:')
       if (repeat === 'yes') {
       location.reload()
       
       } else {
       alert('See you next time!')
       }
   
   

       var word = prompt('Write here your secret word:')
       var matches = []
       var attempts = 0
       var lives = 6
       var guessCharacter = ''
   
       var one = ''
       var two = ''
       var three = ''
       var four = ''
       var five = ''
       var six = '' 
   
       for (var i = 0; i < word.length; i++) 
       matches[i] = '_'
   
       function printMatches() {
           var matchesString = ''
           
           for (var i = 0; i < matches.length; i++) {
               matchesString += matches[i] + ' '
           }
           alert('The secret word is   ' + matchesString)
       }
   
       function askCharacter() {
       guessCharacter = prompt('Let\s guess a character!')
       }
   
   let wrongLetter = ''
   function checkGuessCharacterMatches() {
       var isFound = false
       
           for (var j = 0; j < word.length; j++) {
                   if (matches[j] === guessCharacter || wrongLetter[j] === guessCharacter) {
                       alert('Be carefull, this character is already guessed!')
                       return false
                   } 
               if (guessCharacter == word[j]) {
                   matches[j] = word[j]
                   isFound = true
               } 
           }
       
       if (isFound === false) {
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
           wrongLetter += guessCharacter
           alert(`The character ${guessCharacter} was not found' 
                   ${one}
                   ${two}
                   ${three}
                   ${four}
                   ${five}
                   ${six}` )
       }
   }
   
   function win() {
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
   while (lives > 0 && win() === false) {
   askCharacter()
   if (guessCharacter.length > 1) {
       alert()
   }
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
   
   
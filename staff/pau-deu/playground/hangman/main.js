console.clear()

var word = prompt("word?")
var matches = []

for (var i =0; i < word.length; i++)
    matches[i] = "_"

var attemps = 0
var maxAttemps = 6 
var guessCharacter = ""

function printMatches() {
    var matchesString = ""

    for (var i = 0; i < matches.length; i++)
        matchesString += matches[i] + " "

    console.log(matchesString) 
}

function askCharacter() {
    guessCharacter  = prompt("character?")
}

function checkGuessCharacterMatches() {
    var checkMatch = false
    for (var j = 0; j < word.length; j++) {
        if (word[j] == guessCharacter) {
            matches[j] = guessCharacter
            checkMatch = true
        }
    }
    if (checkMatch === false) {
    attemps++
    console.log("Try again. " +  "Attemps: " + attemps)
    } 
}




function win(){
    var isWin = false
    for (var r = 0; r < word.length; r++) {
        if (matches[r] === word[r]) {
            isWin = true
        console.log("Congrats, you won!")
    } else {
        isWin = false
        return isWin    
        
    }
    return isWin
}
}

printMatches()

if ((attemps === maxAttemps) === false && win() === false) {
  for (var t = attemps; t < maxAttemps; t = attemps) {
      askCharacter()
      checkGuessCharacterMatches()
      printMatches()

      if (win() === true) {
          break
      } else if (guessCharacter === "" || guessCharacter === null) {

          break
      }
  }  
}
 if (attemps === maxAttemps) {
     console.log("You loose, next time it will be.")
 }
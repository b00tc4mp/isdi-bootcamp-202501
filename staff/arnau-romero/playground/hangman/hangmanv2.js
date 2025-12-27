var word = prompt("word? ")
console.clear()
//var word= "lago"
var matches = []
var showSpaces = []

for (var i = 0 ; i  < word.length ; i++){
    showSpaces[i]=' _ '
    
}
var showSpaces2 = showSpaces.toString()
alert(showSpaces2)

var attemps = 0
var maxAttemps = 1
var guessCharacter = ""

function printMatches(){
    var matchesString = ""

    for(var i=0 ; i < matches.length ; i++){
        matchesString += matches[i] + " "
    }
    alert(matchesString)
}

function  askCharacter(){
 //var letter = prompt("character: ")
    var reGex = /[0-9]/
    
    guessCharacter = prompt('character?')
    
    if(reGex.test(guessCharacter) == true){
        alert("SOLO LETRAS!")
    }
}

function checkGuessCharacterMatches() {
    var checkMatch = false
    
    for(var j = 0 ; j < word.length; j++){
        if (word[j] == guessCharacter){
            matches[j] = guessCharacter
            checkMatch = true
        }
             
    }
  
    if (checkMatch === false){
        attemps++
    }
    if(attemps === maxAttemps){
        alert("You loose!!!")
    }
}
function guessWord(){
    var guessWord = prompt("What word it is? ")
    if(guessWord === word){
        alert("Yes " + guessWord + " is the word!!")
    }else {
        alert("No " + guessWord + " isn´t the word!!")
    }
    
}
function youWin(){
    var winString = ""
     for(var x = 0 ; x < matches.length ; x++){
        winString += matches[x]
    }
      if(winString === word){
        alert("You win!!!")
    }
}


while(attemps < maxAttemps){
guessWord()
printMatches()
askCharacter()
checkGuessCharacterMatches()
printMatches()
youWin()
}
console.log('...')
/*printMatches()
askCharacter()
checkGuessCharacterMatches()*/

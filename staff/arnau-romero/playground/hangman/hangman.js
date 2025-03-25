//var word = prompt("word? ")
console.clear()
var word= "l"
var matches = []

for (var i = 0 ; i  <word.length ; i++){
    matches[i]='_'
    
}

var attemps = 0
var maxAttemps = 1
var guessCharacter = ""

function printMatches(){
    var matchesString = ""

    for(var i=0 ; i<matches.length ; i++){
        matchesString += matches[i] + " "
    }
    console.log(matchesString)
}

function  askCharacter(){
 //var letter = prompt("character: ")
    guessCharacter = prompt('character?')
}

function checkGuessCharacterMatches() {
    var checkMatch = false
    var winArray = word.split('');
    
    for(var j = 0 ; j < word.length; j++){
        if (word[j]==guessCharacter){
            matches[j]=guessCharacter
            checkMatch = true
        }
             
    }
    if(winArray===matches){
        alert("You win!!!")
    }
    if (checkMatch===false){
        attemps++
    }
    if(attemps===maxAttemps){
        alert("You loose!!!")
    }
}
console.log(matches)

console.log('...')
printMatches()
askCharacter()
checkGuessCharacterMatches()

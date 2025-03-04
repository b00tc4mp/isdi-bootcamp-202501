console.clear()
//  Me devuelve un numero aleatorio entre 1 y 100
var randomNumber = Math.floor(Math.random() * 100 + 1);
console.log(randomNumber);
var userEntry = 0;
var attempts = 0;
var again = false

function selectDifficulty(){
  var difficultry = prompt('Select your difficulty: \n1. Easy (10 intentos)\n2. Medium (7 intentos)\n3. Hard (4 intentos)');
  switch(difficultry){
     case '1':
      attempts = 10;
      break;
    case '2':
      attempts = 7 
      break;
    case '3':
      attempts = 4
      break;
   
      
     default:
      alert("Selección no válida. Se establecerá el nivel de dificultad en Fácil.");
      attempts = 10;
  }
}

function askUser() {
  while (attempts > 0) {
  userEntry = prompt("Ingresa un número entre 1 y 100:");

    if (userEntry === null) {
      alert("No quieres adivinar. Juego terminado.");
      break;
    }

    userEntry = parseInt(userEntry);

    if (isNaN(userEntry) || userEntry < 1 || userEntry > 100) {
      alert("Por favor, ingresa un número válido entre 1 y 100.");
      continue;
    }

   

    if (userEntry === randomNumber) {
      alert("¡Felicidades, has adivinado el número!");
      break;
    }

    var difference = userEntry - randomNumber;
    // Si la diferencia es negativa, la hago positiva
    if (difference <  0){
      difference= -difference
    }

    console.log(difference);

    if (difference === 0) {
      alert("Felicidades, has adivinado el número");
    } else if (difference > 0 && difference <= 10 ) { 
      alert("Super hot");
      attempts--
    } else if (difference > 10 && difference <= 20) {
      alert("Hot");
      attempts--
    } else if (difference > 20 && difference <= 30) {
      alert("Warm");
      attempts--
    } else if (difference > 30 && difference <= 40) {
      alert("Cold");
      attempts--
    } else if (difference > 40 && difference <= 100) {
      alert("Super cold");
        attempts--
    }
    if (attempts === 0) {
      alert("Lo siento, no te quedan más intentos. El número era " + randomNumber);
      var secondChance = prompt('Do yo wanna repeat: say YES or NO?')
      again = secondChance.toLowerCase() === 'yes' ? true : false
    }
  }
}

function playAgain() {
  while (again) {
    randomNumber = Math.floor(Math.random() * 100 + 1);
    console.log(randomNumber);
    selectDifficulty();
    askUser();
  }
}

selectDifficulty();
askUser();
playAgain();

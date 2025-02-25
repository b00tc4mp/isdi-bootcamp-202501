const logic = {
  constants :{
    randomNumber: 0,
    attempts : 0,
  },

  createARandomNumber() {
    this.constants.randomNumber = Math.floor(Math.random() * 100 + 1);
    console.log(this.constants.randomNumber);
  },
  askUser(userEntry) {
    

    if (userEntry === null)
      throw new Error("El usuario ha cancelado la partida.");

    userEntry = parseInt(userEntry);

    if (isNaN(userEntry) || userEntry < 1 || userEntry > 100)
      throw new Error("El número ingresado no es válido.");

    

    var difference = userEntry - this.constants.randomNumber
    // Si la diferencia es negativa, la hago positiva
    if (difference < 0) {
      difference = -difference;
    }

    console.log(difference);

    if (difference === 0) {
      alert("Felicidades, has adivinado el número");
    } else if (difference > 0 && difference <= 10) {
      alert("Super hot");
      attempts--;
    } else if (difference > 10 && difference <= 20) {
      alert("Hot");
      attempts--;
    } else if (difference > 20 && difference <= 30) {
      alert("Warm");
      attempts--;
    } else if (difference > 30 && difference <= 40) {
      alert("Cold");
      attempts--;
    } else if (difference > 40 && difference <= 100) {
      alert("Super cold");
      this.constants.attempts--;
    }

    
  },
  evaluateDifference(){},

  isLOst() {
    if (attempts === 0) {
      alert(
        "Lo siento, no te quedan más intentos. El número era " + randomNumber
      );
    }
  },

  isWon(){
    if (userEntry === randomNumber) {
      alert("¡Felicidades, has adivinado el número!");
    }
  },

  gameOver(){},

  playAgain() {
    
  },

  getStatus() {
    //TODO
  },

  selectDifficulty(level) {

    switch (level) {
      case "1":
        this.constants.attempts = 10;
        break;
      case "2":
         this.constants.attempts= 7;
        break;
      case "3":
         this.constants.attempts= 4;
        break;

      default:
        alert(
          "Selección no válida. Se establecerá el nivel de dificultad en Fácil."
        );
        attempts = 10;
    }
  },
};

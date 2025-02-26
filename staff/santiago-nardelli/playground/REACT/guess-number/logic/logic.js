const logic = {
  constants: {
    randomNumber: 0,
    attempts: 0,
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

    this.evaluateDifference(userEntry);
    return this.constants.attempts;
  },
  evaluateDifference(userEntry) {
    var difference = userEntry - this.constants.randomNumber;
    // Si la diferencia es negativa, la hago positiva
    if (difference < 0) {
      difference = -difference;
    }

    console.log(difference);


    //Agrego una variable que me aloje mi resultado para poder separar mis capa L de la de I 
    

    if (difference === 0) {
      this.isWon();
    } else if (difference > 0 && difference <= 10) {
      alert("Super hot");
      this.constants.attempts--;
    } else if (difference > 10 && difference <= 20) {
      alert("Hot");
      this.constants.attempts--;
    } else if (difference > 20 && difference <= 30) {
      alert("Warm");
      this.constants.attempts--;
    } else if (difference > 30 && difference <= 40) {
      alert("Cold");
      this.constants.attempts--;
    } else if (difference > 40 && difference <= 100) {
      alert("Super cold");
      this.constants.attempts--;
    }
    if (this.constants.attempts === 0) {
      this.isLost();
    }
  },

  isLost() {
    if (attempts === 0) {
      alert(
        "Lo siento, no te quedan más intentos. El número era " + this.constants.randomNumber
      );
    }
    this.playAgain();
  },

  isWon() {
    if (userEntry === this.constants.randomNumber) {
      alert("¡Felicidades, has adivinado el número!");
    }
    this.playAgain();

  },

  playAgain() {
    this.constants.randomNumber = 0;
    this.constants.attempts = 0;
    
  },

  getStatus() {
    return this.constants.attempts;
  },

  selectDifficulty(level) {
    switch (level) {
      case "1":
        this.constants.attempts = 10;
        break;
      case "2":
        this.constants.attempts = 7;
        break;
      case "3":
        this.constants.attempts = 4;
        break;

      default:
        alert(
          "Selección no válida. Se establecerá el nivel de dificultad en Fácil."
        );
        attempts = 10;
    }
  },
};

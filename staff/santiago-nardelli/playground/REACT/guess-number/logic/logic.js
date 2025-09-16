const logic = {
  helpers: {
    isEmpty(userEntry) {
      if (userEntry === null || userEntry === "")
        throw new Error("El campo no puede estar vacío.");
      if (userEntry === "exit")
        throw new Error("El usuario ha cancelado la partida.");
    },

    isNumber(userEntry) {
      if (isNaN(userEntry))
        throw new TypeError("El valor ingresado no es un número.");
    },

    isInRange(userEntry) {
      if (userEntry < 1 || userEntry > 100)
        throw new RangeError("El número ingresado está fuera de rango.");
    },
  },
  createARandomNumber() {
    data.constants.randomNumber = Math.floor(Math.random() * 100 + 1);
    console.log(data.constants.randomNumber);
  },
  tryNumber(userEntry) {
    
    this.helpers.isEmpty(userEntry);
    userEntry = parseInt(userEntry);
    this.helpers.isNumber(userEntry);
    this.helpers.isInRange(userEntry);

    const difference = this.evaluateDifference(userEntry);
    
    const result = this.sendMessage(difference);
    return result;
  },
  evaluateDifference(userEntry) {
    let difference = userEntry - data.constants.randomNumber;
    if (difference < 0) {
      difference = -difference;
    }

    return difference;
  },

  playAgain() {
    data.constants.randomNumber = 0;
    data.constants.attempts = 0;
  },

  getStatus() {
    return data.constants.attempts;
  },

  selectDifficulty(level) {
    switch (level) {
      case "1":
        data.constants.attempts = 10;
        break;
      case "2":
        data.constants.attempts = 7;
        break;
      case "3":
        data.constants.attempts = 4;
        break;

      default:
        data.constants.attempts = 10;
    }
  },


  //puedo hacer destructuring de data en lugar de data.constants
  sendMessage(difference) {
    let result = {
      message: "",
      attempts: data.constants.attempts,
      isWon: false,
      isLost: false,
      randomNumber: data.constants.randomNumber,
    };

    if (difference === 0) {
      result.message = "¡Felicidades, has adivinado el número!";
      result.isWon = true;
    } else if (difference > 0 && difference <= 10) {
      result.message = data.temperature.literal.VERY_HOT;
      data.constants.attempts--;
    } else if (difference > 10 && difference <= 20) {
      result.message = data.temperature.literal.HOT;
      data.constants.attempts--;
    } else if (difference > 20 && difference <= 30) {
      result.message = data.temperature.literal.WARM;
      data.constants.attempts--;
    } else if (difference > 30 && difference <= 40) {
      result.message = data.temperature.literal.TEMPERED;
      data.constants.attempts--;
    } else if (difference > 40 && difference <= 100) {
      result.message = data.temperature.literal.COLD;
      data.constants.attempts--;
    }
    if (data.constants.attempts === 0 && !result.isWon) {
      result.message =
        "Lo siento, no te quedan más intentos. El número era " +
        data.constants.randomNumber;
      result.isLost = true;
    }
    result.attempts = data.constants.attempts;
    return result;
  },
};

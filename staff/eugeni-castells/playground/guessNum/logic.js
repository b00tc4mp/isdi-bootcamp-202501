const logic = {
  generateRandomNumber(level) {
    switch (level) {
      case "1":
        data.secretNumber = Math.floor(Math.random() * 50) + 1;
        data.maximumLevelValue = 30;
        break;
      case "2":
        data.secretNumber = Math.floor(Math.random() * 100) + 1;
        data.maximumLevelValue = 100;
        break;
      case "3":
        data.secretNumber = Math.floor(Math.random() * 150) + 1;
        data.maximumLevelValue = 150;
        break;
      default:
        break;
    }

    return data.secretNumber;
  },
  makePositiveNumber(number) {
    let rest = number - data.secretNumber;

    if (rest < 0) {
      return rest * -1;
    } else {
      return rest;
    }
  },
  checkNumber(guessedNumber) {
    if (data.isWon) throw new Error("Game alrady over");
    if (this.isGameLost() === true) throw new Error("Game already lost");

    let normalizedRest = this.makePositiveNumber(guessedNumber);

    if (normalizedRest > this.calculateLevelPercentage(50)) {
      data.attempts++;
      alert(`Cold! ${data.constants.MAX_ATTEMPTS - data.attempts} reamining!`);
    } else if (
      normalizedRest <= this.calculateLevelPercentage(50) &&
      normalizedRest > this.calculateLevelPercentage(30)
    ) {
      data.attempts++;
      alert(
        `Tempered! ${data.constants.MAX_ATTEMPTS - data.attempts} reamining!`
      );
    } else if (
      normalizedRest <= this.calculateLevelPercentage(30) &&
      normalizedRest > this.calculateLevelPercentage(15)
    ) {
      data.attempts++;
      alert(`Warm! ${data.constants.MAX_ATTEMPTS - data.attempts} reamining!`);
    } else if (
      normalizedRest <= this.calculateLevelPercentage(15) &&
      normalizedRest > this.calculateLevelPercentage(5)
    ) {
      data.attempts++;
      alert(`HOT! ${data.constants.MAX_ATTEMPTS - data.attempts} reamining!`);
    } else if (
      normalizedRest <= this.calculateLevelPercentage(5) &&
      normalizedRest >= this.calculateLevelPercentage(1)
    ) {
      data.attempts++;
      alert(
        `Very hot! ${data.constants.MAX_ATTEMPTS - data.attempts} reamining!`
      );
    } else if (normalizedRest === 0) {
      alert(`Congratulations, you won! The number was ${data.secretNumber}`);
      data.isWon = true;
    }
  },
  calculateLevelPercentage(multiplier) {
    return Math.floor((data.secretNumber * multiplier) / 100) + 1;
  },
  getMaximumLevelValue() {
    return data.maximumLevelValue;
  },
  validateNumber(number) {
    if (number < 0) throw new RangeError("number can't be negative");
    if (number > data.maximumLevelValue)
      throw new RangeError("number can't be higher than the maximum");
  },
  isGameLost() {
    return data.constants.MAX_ATTEMPTS - data.attempts === 0;
  },
  isGameOn() {
    return data.isWon;
  },
  isGameOver() {
    return this.isGameLost() || this.isGameOn();
  },
  reset() {
    data.attempts = 0;
    data.secretNumber = null;
    data.maximumLevelValue = null;
  },
};

Array.prototype.slice = function (startIndex, endIndex) {
    var returnedArray = []

    //DEFFENSIVE PROGRAMMING
    if (arguments.length === 0) {
        return this
    }

    if (startIndex >= this.length || endIndex === 0) {
        return returnedArray
    }

    // --- USE CASES ---
    if (arguments.length === 1) {
        //POSITIVE OR 0 STARTINDEX
        if (startIndex >= 0) {
            for (let i = startIndex; i < this.length; i++) {
                var current = this[i]

                returnedArray[returnedArray.length] = current
            }
        }
        //NEGATIVE INDEX
        else {
            //FORCE STARTINDEX 0 IF IT'S BIGGER THAN ARRAY.LENGTH
            if (startIndex * -1 > this.length) {
                for (let i = 0; i < this.length; i++) {
                    var current = this[i]

                    returnedArray[returnedArray.length] = current
                }
                //SUBSTRACT SINCE ARRAY.LENGTH AND START COUNTING TO SLICE
            } else {
                for (let i = this.length + startIndex; i < this.length; i++) {
                    var current = this[i]

                    returnedArray[returnedArray.length] = current
                }
            }
        }
    }
    if (arguments.length >= 2) {

        if (endIndex < 0) {
            endIndex = this.length + endIndex
        }

        if (startIndex >= 0) {
            for (let i = startIndex; i < endIndex; i++) {
                var current = this[i]

                returnedArray[returnedArray.length] = current
            }
        }
        //NEGATIVE INDEX
        else {
            //FORCE STARTINDEX 0 IF IT'S BIGGER THAN ARRAY.LENGTH
            if (startIndex * -1 > this.length) {
                for (let i = 0; i < this.length; i++) {
                    var current = this[i]

                    returnedArray[returnedArray.length] = current
                }

                //SUBSTRACT SINCE ARRAY.LENGTH AND START COUNTING TO SLICE UNTIL ENDINDEX
            } else {
                for (let i = this.length + startIndex; i < endIndex; i++) {
                    var current = this[i]

                    returnedArray[returnedArray.length] = current
                }
            }
        }
    }
    return returnedArray
}
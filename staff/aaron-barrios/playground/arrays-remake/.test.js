var ray = ["ant", "bison", "camel", "duck", "elephant"]
var b = function (fromIndex, deleteCount, ...elements) {
    const removedElements = []

    //DEFENSIVE PROGRAMMING
    if (fromIndex >= ray.length || arguments.length === 0) {
        return removedElements
    }

    //ADJUST FROMINDEX IF NEGATIVE OR OUT OF RANGE
    if (fromIndex < 0) {
        fromIndex = ray.length + fromIndex
        if (fromIndex < 0) fromIndex = 0
    }

    // --- CASE 1 ARGUMENT ----
    if (arguments.length === 1) {
        for (let i = fromIndex; i < ray.length; i++) {
            var currentElement = ray[i]

            removedElements[removedElements.length] = currentElement
        }

        return removedElements
    }

    // --- CASE 2 ARGUMENTS ---
    if (arguments.length === 2) {
        //DEFFENSIVE PROGRAMING
        if (deleteCount <= 0) return removedElements

        //ADJUST DELETECOUNT IF > ARRAY.LENGTH
        if (fromIndex + deleteCount > ray.length) {
            deleteCount = ray.length - fromIndex
        }

        //PUSH ITEMS TO REMOVED ELEMENTS
        for (let i = fromIndex; i < fromIndex + deleteCount; i++) {
            var currentElement = ray[i]
            removedElements[removedElements.length] = currentElement
        }

        //REMOVE ORIGINAL ARRAY ITEMS
        for (let i = fromIndex; i < ray.length - deleteCount; i++) {
            ray[i] = ray[i + deleteCount]
        }

        ray.length -= deleteCount

        return removedElements
        // console.log(ray, removedElements)
    }

    // --- CASE 3 ARGUMENTS ---
    //DEFFENSIVE PROGRAMING
    if (deleteCount < 0) return removedElements

    if (arguments.length >= 3) {

        //ADJUST DELETECOUNT IF > ARRAY.LENGTH
        if (fromIndex + deleteCount > ray.length) {
            deleteCount = ray.length - fromIndex
        }

        //PUSH ITEMS TO REMOVED ELEMENTS
        for (let i = fromIndex; i < fromIndex + deleteCount; i++) {
            var currentElement = ray[i]
            removedElements[removedElements.length] = currentElement
        }

        //REMOVE ORIGINAL ARRAY ELEMENT(S)
        for (let i = fromIndex; i < ray.length - deleteCount; i++) {
            ray[i] = ray[i + deleteCount]
        }

        ray.length -= deleteCount

        //MOVE ELEMENTS X POSITIONS TO RIGHT UNTIL FROMINDEX
        for (let i = ray.length - 1; i >= fromIndex; i--) {
            ray[i + elements.length] = ray[i]
        }

        //INSERT ELEMENTS FROMINDEX POS
        for (let i = 0; i < elements.length; i++) {
            ray[fromIndex + i] = elements[i]
        }
        console.log(ray, removedElements)

        return removedElements
    }
}

// --- test splice method --- 
// var array = ["ant", "bison", "camel", "duck", "elephant"]
// var mutedArray = array.splice(-5, 2, 'person', 'giraffe')
// console.log(array, mutedArray)


// --- test my method --- 
b(-5, 2, 'person', 'giraffe')


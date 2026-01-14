// implementación SPLICE

// CASE 1: 

Array.prototype.splice = function (startIndex, removedCount, element) {

    const removedElements = []

    for (let i = startIndex; i < startIndex + removedCount; i++) {
        
        const currentElement = this[i]

        removedElements[removedElements.length] = currentElement

        this[i] = element //reemplazo la posición iterada del array por element
    }
    return removedElements
} 
    
/*
-crear array con elementos eliminados (si los hay)
-iterar en el array desde startIndex hasta indexFrom + removeCount
-copiar elementos iterados ( de startIndex i startIndex + removedCount) al array de removedElements
-copiar element en las posiciones iteradas
-retornar removedElements
*/


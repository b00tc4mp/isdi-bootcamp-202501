Array.prototype.splice = function(indexForm, removeCount, ...element){
    /*
    Crear array con elementos a retornar
    Iterar el array desde indexForm hasta indexForm + removeCount
    Copiar elementos iterados al array removedElements
    Copiar element en las posiciones iteradas
    Retornar removedElements
    */
    const removedElements = []

    for(let i =indexForm; indexForm < indexForm + removeCount; indexForm++){
        const currentElement = this[i]
        
        removedElements[removedElements.length] = currentElement

        this[i] = element
    }

    
}

const array = [1, 2, 3, 4, 5]

array.includes(2)
//true

array.includes(6)
//false

array.includes(2, 4) //the second parameter, (fromIndex) evaluate the array.length
//true

array.includes(2, 6) //the second parameter, (fromIndex) evaluate the array.length

//false

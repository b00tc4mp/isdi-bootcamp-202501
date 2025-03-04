/*
 El método pop() elimina el último elemento de un array y lo devuelve. Este método cambia la longitud del array.

 Tambien me devuelve ese elemento eliminado si quiero guardarlo en una variable.

 Si se llama a pop() en un array vacío, devuelve undefined.
 */
 const plants = ["broccoli", "cauliflower", "cabbage", "kale", "tomato"];

 console.log(plants.pop());
 // Expected output: "tomato"
 
 console.log(plants);
 // Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
 
 plants.pop();
 
 console.log(plants);
 // Expected output: Array ["broccoli", "cauliflower", "cabbage"]
 


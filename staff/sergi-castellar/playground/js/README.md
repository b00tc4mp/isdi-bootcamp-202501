# JAVASCRIPT CHEAT SHEET 
![markdown logo](https://static.vecteezy.com/system/resources/previews/051/336/397/non_2x/javascript-transparent-logo-free-png.png)

---
# MÉTODOS DE ARRAYS PRINCIPALES

## filter
Crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
```sh
const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter((word) => word.length > 6);

console.log(result);
→ Expected output: Array ["exuberant", "destruction", "present"]
```


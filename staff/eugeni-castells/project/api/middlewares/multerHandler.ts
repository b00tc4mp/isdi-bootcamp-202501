import multer from "multer";

// Configurem multer per pujar fitxers a memòria (RAM) És possible configurar el middleware perquè es guardi a diskStorage que és el disc dur
//de moment amb le simatges que tindré i el volum no caldrà.
const storage = multer.memoryStorage();

//Això farà que es processi qualsevol fitxer que tingui el nom images
export const multerHandler = multer({ storage }).array("images");

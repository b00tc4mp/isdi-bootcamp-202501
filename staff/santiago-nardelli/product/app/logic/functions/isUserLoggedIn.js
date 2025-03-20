 //funcion para saber si el user esta logueado la doble !! convierte el valor en booleano

 import { data } from "../../data/data.js";
 
 export const isUserLoggedIn = () => !!data.userId;

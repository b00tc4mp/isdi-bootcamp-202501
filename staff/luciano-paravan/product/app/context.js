import { createContext, useContext as useContextFromReact } from 'react' //useContext permite crear mi propio contexto, le cambiamos el nombre para diferenciarlo del que vamos a crear

export const Context = createContext() //a partir de lo que inyectamos aca, usamos el context de abajo, lo haremos dentro del hook

//Este sera mi contexto, que por dentro va a hacer
export const useContext = () => useContextFromReact(Context) //Nuestro useContext es una callback que llama al useContext de React y le pasa el contexto en el cual tenemos que trabajar. Y ya devuelve el objeto que proveemos 

//y va a devolver el contexto, que es el objeto que inyectemos

//En este contexto vamos a proveer un objeto y ese objeto esperamos usarlo luego e inyectarle cosas

// En el fichero context tenemos el componente Context de contexto react, y el hook nuestro useContext que llama al hook original de react, que utiliza el Context para obtener el objeto
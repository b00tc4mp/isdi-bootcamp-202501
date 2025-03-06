/*
Creo una clase que me permite manejar la data de mi aplicacion
 dentro de ella creo un constructor que recibe un nombre y un objeto data 
 con las propiedades users, posts y userId
 dentro de la clase creo metodos que me permiten obtener todos los usuarios,
 guardar todos los usuarios, obtener un usuario por id, insertar un post,
 encontrar un usuario por id y actualizar un usuario por id



    
 */

class DataManagger {
  constructor(name) {
    this.name = name;
  }

  getAll() {
    //JSON.parse() convierte un string JSON en un objeto JavaScript--> de JSON a JS -->PARSE(solo obj, arr, primitivos)
    const collection = JSON.parse(localStorage[this.name] || "[]");

    return collection;
  }

  setAll(collection) {
    //JSON.stringify() convierte un objeto JavaScript en un string JSON --> de JS a JSON -->STRINGIFY(solo obj, arr, primitivos)
    const json = JSON.stringify(collection);

    localStorage[this.name] = json;
  }

  getById(id) {
    //accedo a la coleccion de usuarios
    const collection = JSON.parse(localStorage[this.name] || "[]");

    //busco el usuario por id con el metodo find que por parametros le paso un callback que recibe un usuario y me devuelve el usuario que coincida con el id o null si no hay ninguno
    // a todo esto yo este meotod cuando lo utilizo le paso el id del usuario que quiero buscar
    const document = collection.find(document => document.id === id) || null;

    return document
  }

  insertOne(document) {
    // cuando quierta usar este metodo le paso un objeto usuario/documento que quiero insertar
    //obtengo la coleccion de usuarios accediendo a la funcion getAll
    const collection = JSON.parse(localStorage[this.name] || "[]");

    //le asigno un id unico al usuario/documento
    document.id = data.uuid();

    //inserto el usuario/documento en la coleccion
    collection.push(document);

    //guardo la coleccion en el localStorage
    const json = JSON.stringify(collection);
    
    localStorage[this.name] = json;
  }

  findOne(condition) {
    //por parametros le paso un callback que recibe un usuario y me devuelve el usuario que coincida con la condicion o null si no hay ninguno
    const collection =JSON.parse(localStorage[this.name] || "[]");

    for (let i = 0; i < collection.length; i++) {
        const document = collection[i]

        const matches = condition(document)

        if (matches) return document
    }

    return null
  }

  updateOne(document) {

    const collection = JSON.parse(localStorage[this.name] || "[]");

    const index = collection.findIndex(doc => doc.id === document.id)

    collection[index] = document

    const json = JSON.stringify(collection);

    localStorage[this.name] = json;
  }
}

var data = {
  // genero un unico id por user
  uuid() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2);
    return `${timestamp}-${random}`;
  },

  // creo un objeto data que tiene como propiedades collection, posts
  users: new DataManagger("users"),
  posts: new DataManagger("posts"),

  // esta funcion A DIFERENCIA DE LOCAL/SESSION STORAGE,es para obtener el id del usuario y devuelvo null sino hay ninguno

  get userId() {
    const id = JSON.parse(sessionStorage.userId || "null");

    return id;
  },

  // esta funcion me permite guardar el id del usuario en el sessionStorage
  set userId(id) {
    const json = JSON.stringify(id);

    sessionStorage.userId = json;
  },
};
export default data
/*
Hosting
1- en consola de gitbash --> npm i -g surge
si sale problema es sudo npm i -g surge
2- en consola de gitbash --> surge login (ingresar email y contraseña)
3- en consola de gitbash --> surge (para publicar)
elijo mi carpeta staff/santiago-nardelli/product/app "nombre de dominio".surge.sh
*/

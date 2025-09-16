const data = {
   
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
  export default data;
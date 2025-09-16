export const data = {
   
    
    // esta funcion A DIFERENCIA DE LOCAL/SESSION STORAGE,es para obtener el id del usuario y devuelvo null sino hay ninguno
  
    get token() {
      const id = JSON.parse(sessionStorage.token|| "null");
  
      return id;
    },
  
    // esta funcion me permite guardar el id del usuario en el sessionStorage
    set token(id) {
      const json = JSON.stringify(id);
  
      sessionStorage.token = json;
    },
  };
 
var data = {
    // genero un unico id por user
    uuid() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2);
        return `${timestamp}-${random}`;
    },
    /**
     * Modifico mi data estatica a data localStorage para que los datos persistan getter y setter 
     */

    // esta funcion me permite obtener los usuarios del localStorage y si no hay ninguno me devuelve un array vacio
    //JSON.parse convierte un string en un objeto
    //localStorage.getItem obtiene el valor del item del localStorage
    get users() {
        const users = JSON.parse(localStorage.users || '[]') 

        return users

    },

    // esta funcion me permite guardar los usuarios en el localStorage
    //JSON.stringify convierte un objeto en un string
    set users(users) {
        const json = JSON.stringify(users)

        localStorage.users = json
    },

    // esta funcion A DIFERENCIA DE LOCAL/SESSION STORAGE,es para obtener el id del usuario y devuelvo null sino hay ninguno 

    get userId(){
        const id = JSON.parse(sessionStorage.userId || 'null')

        return id
    },

    // esta funcion me permite guardar el id del usuario en el sessionStorage
    set userId(id){
        const json = JSON.stringify(id)

        sessionStorage.userId = json
    },

    get posts(){

        const posts = JSON.parse(localStorage.posts || '[]')

        return posts
    },
    
    // cuando hago set por parametros tengo que pasar algo para que se guarde en el localStorage
    set posts(post){

        const json = JSON.stringify(post)

        localStorage.posts = json
    }
        
    

}

/*
Hosting
1- en consola de gitbash --> npm i -g surge
si sale problema es sudo npm i -g surge
2- en consola de gitbash --> surge login (ingresar email y contraseña)
3- en consola de gitbash --> surge (para publicar)
elijo mi carpeta staff/santiago-nardelli/product/app "nombre de dominio".surge.sh
*/
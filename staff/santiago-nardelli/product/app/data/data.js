var data = {
    // genero un unico id por user
    uuid: function generarIdUsuario() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2);
        return `${timestamp}-${random}`;
    },

    users: []
        
          

}

/*
Hosting
1- en consola de gitbash --> npm i -g surge
si sale problema es sudo npm i -g surge
2- en consola de gitbash --> surge login (ingresar email y contraseña)
3- en consola de gitbash --> surge (para publicar)
elijo mi carpeta staff/santiago-nardelli/product/app "nombre de dominio".surge.sh
*/
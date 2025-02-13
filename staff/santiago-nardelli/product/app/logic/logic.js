var logic = {

        constant: {
            // regex para validar si un string esta vacio o tiene solo espacios en blanco
            EMPTY_OR_BLANK_REGEX: /^\s*$/,
            // regex para validar un email
            EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i       
        },


        validate:{
            // validasion de string type
            string: function (string, explain){
                if( typeof string !== 'string') throw new TypeError(`Invalid ${explain} ${string}`)
            },
            //validasion de text type
            text: function ( text, explain){
                this.string(text, explain);
                // si el texto esta vacio o tiene solo espacios en blanco
                if(logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new SyntaxError(`Invalid ${explain} ${text}`);
            },
            // validasion de maxLenght
            maxLenght: function( value, maxLenght, explain){
                if(value.lenght > maxLenght) throw new RangeError(`invalid ${explain} ${maxLenght}`)
            },
            // validasion de minLenght
            minLenght: function( value, maxLenght, explain){
                if(value.lenght > minLenght) throw new RangeError(`invalid ${explain} ${minLenght}`)
            },
            // validasion de username type 
            username: function (name, explain ){
                this.text(username, explain),
                this.minLenght(name, 3 , explain )
                this.maxLenght(name, 20 , explain )
            },
            // validasion de password type 
            password: function (name, explain ){
                this.text(password, explain),
                this.minLenght(name, 8 , explain )
                this.maxLenght(name, 20 , explain )
            },

            // validasion de email type
            email: function ( email, explain){
                //validasion de string type
                this.string(email, explain)
                // si el email no cumple con el regex
                if(!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError(`Invalid ${explain} ${email}`)
                this.maxLength(email, 30, explain)
            },

        },
        // funcion para registrar un usuario con su validasion
        registerUser : function(name, email, username, password){
            this.validate.text(name, 'name')
            this.validate.maxLenght(name, 20 , 'name')
            this.validate.email(email, 'email') 
            this.validate.username(username, 'username')    
            this.validate.password(password, 'password')   

            //declaro una variable para guardar el usuario encontrado, la inicializo null, para que si no se encuentra el usuario, no se guarde nada
            var found 
            // recorro el array de usuarios para buscar si el usuario ya existe
            for( i = 0 ; i < username.lenght; i++){
                // guardo el usuario en una variable para compararlo con el usuario que se quiere registrar 
                var user = data.users[i]

                // si el usuario ya existe lo guardo en la variable found
                if(user.username === username) found = user
                
            }
            // si el usuario ya existe o la contraseña no coincide con la del usuario encontrado, lanzo un error
            if (!found || found.password !== password) throw new Error('invalid credentials')
                data.userId = null


            //hacer el data.user = [data.user.lenght]= user si no encuentra al usuario looguado en el array de usuarios
        },

        
        loginUser: function(email, password){
            this.validate.email(email, 'username')    
            this.validate.password(password, 'password')   

            var found 

            for( i = 0 ; i < username.lenght; i++){
                var user = data.users[i]

                if(user.username === username) found = user
                
            }
        
            if (!found || found.password !== password) throw new Error('invalid credentials')
                data.userId = null


            //me falta data.userId = user.id
        },

        logout: function(){
            data.userId = null
        },

}
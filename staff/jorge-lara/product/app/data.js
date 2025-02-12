let data ={
    uuid: function (){
        //return crypto.randomUUID()
        return (Math.random() * 10 ** 17).toString(36);
    },

    users: [],
    userlogged: ''
}
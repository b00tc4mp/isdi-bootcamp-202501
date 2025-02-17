var data = {
    // genero un unico id por user
    uuid: function generarIdUsuario() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2);
        return `${timestamp}-${random}`;
    },

    users: [

        {
            id: 'm73hzspg-cjz345t0kzr',
            name: 'Helga Pataki',
            email: 'Helga@pataki.com',
            username: 'helgapataki',
            password: '12345',
            createdAt: new Date(2024, 0, 10),
            modifiedAt: null
        },

        {
            id: 'm73i0gsz-cxrxknt5klk',
            name: 'Arnold',
            email: 'hey@arnold.com',
            username: 'heyarnold',
            password: '54321',
            createdAt: new Date(2024, 0, 30),
            modifiedAt: null
        }


    ],


    posts: [

        {
            id: 'm73i2fdx-riw6kmzv52',
            author: 'm73i0gsz-cxrxknt5klk',
            image: 'https://media.giphy.com/media/l4EoS4FShnTLbptOE/giphy.gif?cid=790b7611wfv00fcfuc86l5jmh9nho25hby0jdx93fghvrqpo&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            title: 'Hey you!',
            createdAt: new Date(2024, 0, 30),
            modifiedAt: null
        },


        {
            id: 'm73i2xu2-epai2nqwoxl',
            author: 'm73hzspg-cjz345t0kzr',
            image: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDVqbGoxYmduejJudmVleWVmcXRvd3dqb3pjcjR4d2JvdXpnaTdpNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0DAG7ikMKa3WCNji/giphy.gif',
            title: 'Strike !',
            createdAt: new Date(2024, 0, 20),
            modifiedAt: null
        }

    ]
        
          

}

/*
Hosting
1- en consola de gitbash --> npm i -g surge
si sale problema es sudo npm i -g surge
2- en consola de gitbash --> surge login (ingresar email y contraseña)
3- en consola de gitbash --> surge (para publicar)
elijo mi carpeta staff/santiago-nardelli/product/app "nombre de dominio".surge.sh
*/
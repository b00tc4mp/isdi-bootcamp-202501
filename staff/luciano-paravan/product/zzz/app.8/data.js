const data = {
    uuid () {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },
    users: [
        {   id: 'm76eksz2o6',
            name: 'Vera',
            surname: 'Pintado',
            email: 'varaypintado@gmail.com',
            username: 'veraypintado',
            password: '11111111'
        },            
        {
            id: 'm76elc08759',
            name: 'Ricardo',
            surname: 'Aldao',
            email: 'ricardo@gmail.com',
            username: 'richard123',
            password: '22222222'
        },
        {
            id: 'm799klr6j2',
            name: 'Juan',
            surname: 'Perez',
            email: 'jp@gmail.com',
            username: 'jp',
            password: 'golgolgol'
        }
    ],
    posts: [
        {   
            id: 'abc123def456',
            author: 'm76eksz2o6',
            image: 'https://media.giphy.com/media/26FeZcg6jACh840dq/giphy.gif?cid=790b7611ncwkumxyi9bcgwg06xfsbtbed45ukmbhmy4btgkv&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            text: 'The best',
            createdAt: new Date(2025, 0,1) ,
            modifiedAt: null,
            likes: ['qwe123rty456', 'abc123def456']
        },
        {
            id: 'qwe123rty456',
            author: 'm76elc08759',
            image: 'https://media.giphy.com/media/Lwlp1X2aC9gEU/giphy.gif?cid=ecf05e47y607uq53yx9gslpkgf2hnedutl1l8xg09g1i9rb7&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            text: 'ehhhhh',
            createdAt: new Date(2025, 1,15) ,
            modifiedAt: null,
            likes: []
        }
        

    ],
    userId: null, //para ver si el usuario esta conectado
}
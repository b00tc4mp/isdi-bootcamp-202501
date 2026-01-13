// ****  HOME 

class Home extends Component {
    constructor() {
        super('div')

        const logo = new Heading(1)
        logo.setText('Home')
        logo.container.style.textShadow = '2px 2px 3px black'
        this.add(logo)

        // Texto de bienvenida
        const welcome = new Heading(2)
        welcome.setText('Hello, World')
        this.add(welcome)
        this.welcome = welcome

        // Boton de desconexion del usuario
        const logoutButton = new Button()
        logoutButton.setText('Logout')
        logoutButton.addClickListener(function () {
            try {
                logic.logoutUser()

                this.logoutClickListener()
            } catch (error) {
                console.error(error)

                alert(error.message)

            }
        }.bind(this))
        this.add(logoutButton)



        // Boton para añadir un post nuevo 
        const addPostButton = new Button()
        addPostButton.setText(' New + ')
        addPostButton.container.style.margin = '25px'
        addPostButton.addClickListener(function () {
            const createPost = new CreatePost()

            createPost.addCreatePostSubmitListener(function () {
                this.remove(createPost)

                this.loadPosts()
                this.add(addPostButton)
                this.add(postsSection)
            }.bind(this))

            createPost.addCancelClickListener(function () {
                this.remove(createPost)
                this.add(addPostButton)
                this.add(postsSection)
            }.bind(this))

            this.add(createPost)
            this.remove(addPostButton)
            this.remove(postsSection)
        }.bind(this))
        this.add(addPostButton)

        // Seccion de los posts
        const postsSection = new Section()
        this.add(postsSection)
        this.postsSection = postsSection
    }




    // Creamos un metodo para el cambio de ventana
    addLogoutClickListener(listener) {
        this.logoutClickListener = listener
    }

    // Crea el texto de vienvenida con el nombre del usuario
    loadUserName() {
        try {
            const name = logic.getUserName()

            this.welcome.setText('Hello, ' + name + '!')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    // Bucle que genera el Post con toda la informacion
    loadPosts() {
        this.postsSection.container.innerHTML = ''
        // Resetea el contenido del contenedor antes de general el nuevo


        try {
            const posts = logic.getPosts()

            // Generamos el contenido pero con los ultimos Posts en primer lugar
            for (let i = posts.length - 1; i > -1; i--) {
                const post = posts[i]

                const postArticle = new Article()

                // Crea el texto con el nombre de usuario del Autor del post
                const authorHeading = new Heading(4)
                authorHeading.setText(post.userName)
                postArticle.add(authorHeading)

                // Crea la Imagen del post
                const postImage = new Image()
                postImage.setUrl(post.image)
                postArticle.add(postImage)
                postImage.container.style.maxWidth = '600px'

                // Crea el texto escrito por el Autor del post
                const postText = new Paragraph()
                postText.setText(post.text)
                postArticle.add(postText)


                // Crea la fecha de subida del post
                const postDate = new Time()
                postDate.setText(post.createdAt.toLocaleString())
                postArticle.add(postDate)

                // Añade el PostArticle al PostsSection
                this.postsSection.add(postArticle)
            }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
}

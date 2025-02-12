function Home() {
    Component.call(this, 'div')

    //Header
    var header = new Header()
    header.container.style.width = '100%'
    header.container.style.height = '50px'
    header.container.style.margin = '10px'
    header.container.style.display = 'flex'
    header.container.style.justifyContent = 'space-between'
    header.container.style.alignItems = 'center'
    this.add(header)

    var logoTitle = new Heading(2)
    logoTitle.setText('Logo')
    header.add(logoTitle)

    var logoutButton = new Button()
    logoutButton.setText('Logout')
    logoutButton.container.style.width = '100px'
    logoutButton.container.style.height = '35px'
    logoutButton.container.style.marginRight = '10px'
    this.logoutButton = logoutButton
    header.add(logoutButton)

    //MAIN HOME
    var main = new Main()
    this.add(main)

    var posts = new Article()
    posts.container.style.display = 'flex'
    posts.container.style.width = '100%'
    posts.container.style.maxWidth = 'inherit'
    posts.container.style.flexDirection = 'column'
    posts.container.style.gap = '10px'
    main.add(posts)


    //KIWIII POST
    var kiwiUser = new Heading(3)
    kiwiUser.setText('Juanpi')
    posts.add(kiwiUser)

    var kiwiPost = new Image()
    kiwiPost.container.src = 'https://www.nutritionadvance.com/wp-content/uploads/2017/12/whole-kiwi-fruit-and-half-a-kiwi-showing-flesh.jpg'
    kiwiPost.container.style.width = '100%'
    kiwiPost.container.style.height = 'auto'
    posts.add(kiwiPost)

    var kiwiMojis = new Span()
    kiwiMojis.container.style.display = 'flex'
    kiwiMojis.container.style.justifyContent = 'left'
    kiwiMojis.container.style.gap = '5px'
    posts.add(kiwiMojis)

    var kiwiLikeButton = new Button()
    kiwiLikeButton.setText('🤍')
    kiwiLikeButton.container.style.backgroundColor = 'transparent'
    kiwiMojis.add(kiwiLikeButton)

    kiwiLikeButton.addClickListener(function () {
        this.textContent = this.textContent === '🤍' ? '❤️' : '🤍'
    })

    var commentEmoji = new Anchor()
    commentEmoji.setText('📃')
    kiwiMojis.add(commentEmoji)

    var comment = new Span()
    comment.setText('Comment...')
    comment.container.style.opacity = '60%'
    comment.container.style.color = 'black'
    kiwiMojis.add(comment)


    // //BANANA POST
    var bananaUser = new Heading(3)
    bananaUser.setText('Manu')
    posts.add(bananaUser)

    var bananaPost = new Image()
    bananaPost.container.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAVh4eUU6jtRS9zzlomMGLvWgpua5Xj5IcoQ&s'
    bananaPost.container.style.width = '100%'
    bananaPost.container.style.height = 'auto'
    posts.add(bananaPost)

    var nanaMojis = new Span()
    nanaMojis.container.style.display = 'flex'
    nanaMojis.container.style.justifyContent = 'left'
    nanaMojis.container.style.gap = '5px'
    posts.add(nanaMojis)

    var bananaLikeButton = new Button()
    bananaLikeButton.setText('🤍')
    bananaLikeButton.container.style.backgroundColor = 'transparent'
    nanaMojis.add(bananaLikeButton)

    bananaLikeButton.addClickListener(function () {
        this.textContent = this.textContent === '🤍' ? '❤️' : '🤍'
    })

    var commentEmoji = new Anchor()
    commentEmoji.setText('📃')
    nanaMojis.add(commentEmoji)

    var comment = new Span()
    comment.setText('Comment...')
    comment.container.style.opacity = '60%'
    comment.container.style.color = 'black'
    nanaMojis.add(comment)


    // //ORANGE POST
    var orangeUser = new Heading(3)
    orangeUser.setText('Frank')
    posts.add(orangeUser)

    var orangePost = new Image()
    orangePost.container.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgqLw4idW1IdAusBGfdZPewk0HTJyRUzPCPg&s'
    orangePost.container.style.width = '100%'
    orangePost.container.style.height = 'auto'
    posts.add(orangePost)

    var oraMojis = new Span()
    oraMojis.container.style.display = 'flex'
    oraMojis.container.style.justifyContent = 'left'
    oraMojis.container.style.gap = '5px'
    posts.add(oraMojis)

    var orangeLikeButton = new Button()
    orangeLikeButton.setText('🤍')
    orangeLikeButton.container.style.backgroundColor = 'transparent'
    oraMojis.add(orangeLikeButton)

    orangeLikeButton.addClickListener(function () {
        this.textContent = this.textContent === '🤍' ? '❤️' : '🤍'
    })

    var commentEmoji = new Anchor()
    commentEmoji.setText('📃')
    oraMojis.add(commentEmoji)

    var comment = new Span()
    comment.setText('Comment...')
    comment.container.style.opacity = '60%'
    comment.container.style.color = 'black'
    oraMojis.add(comment)
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

Home.prototype.addLogoutClickListener = function (listener) {
    this.logoutButton.addClickListener(listener)
}
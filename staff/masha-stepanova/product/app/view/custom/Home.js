function Home() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var article1 = new Article()
    this.add(article1)

    article1.container.style.display = 'flex'
    article1.container.style.flexDirection = 'column'
    article1.container.style.gap = '0.3rem'

    var username1 = new Heading(3)
    username1.setText('username1')
    article1.add(username1)

    var picture1 = new Picture()
    picture1.setSource('https://t4.ftcdn.net/jpg/09/02/37/89/240_F_902378980_u4sL7oSE5RB3fTlgJnCyscPoH6lrF4uy.jpg')
    article1.add(picture1)

    var spanArticle1 = new Span()
    article1.add(spanArticle1)

    spanArticle1.container.style.display = 'flex'
    spanArticle1.container.style.justifyContent = 'space-between'

    var description1 = new Text()
    description1.setText('Caption')
    spanArticle1.add(description1)

    var likeButton1 = new Button()
    likeButton1.setText('🤍')
    likeButton1.addClickListener(function () {
        likeButton1.container.innerText = likeButton1.container.innerText === '🤍' ? '💛' : '🤍'
    })
    spanArticle1.add(likeButton1)

    var article2 = new Article()
    this.add(article2)

    article2.container.style.display = 'flex'
    article2.container.style.flexDirection = 'column'
    article2.container.style.gap = '0.3rem'

    var username2 = new Heading(3)
    username2.setText('username2')
    article2.add(username2)

    var picture2 = new Picture()
    picture2.setSource('https://imgs.search.brave.com/sZjKUhOvtfY9crCnDhxXV0l62Y1j-6MOfn3qjktlfr8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk0Lzk4LzM0/LzM2MF9GXzI5NDk4/MzQ4NF9uZEx2eDZa/bkRManJQckFGSjJy/NDNlSVVUNk5HZkxu/SS5qcGc')
    article2.add(picture2)

    var spanArticle2 = new Span()
    article2.add(spanArticle2)

    spanArticle2.container.style.display = 'flex'
    spanArticle2.container.style.justifyContent = 'space-between'

    var description2 = new Text()
    description2.setText('Caption')
    spanArticle2.add(description2)

    var likeButton2 = new Button()
    likeButton2.setText('🤍')
    likeButton2.addClickListener(function () {
        likeButton2.container.innerText = likeButton2.container.innerText === '🤍' ? '💛' : '🤍'
    })
    spanArticle2.add(likeButton2)

    var article3 = new Article()
    this.add(article3)

    article3.container.style.display = 'flex'
    article3.container.style.flexDirection = 'column'
    article3.container.style.gap = '0.3rem'

    var username3 = new Heading(3)
    username3.setText('username3')
    article3.add(username3)

    var picture3 = new Picture()
    picture3.setSource('https://t4.ftcdn.net/jpg/10/28/90/93/240_F_1028909330_gJNTy01sKzbYo0umWlGa1e5oiWHkJxB9.jpg')
    article3.add(picture3)

    var spanArticle3 = new Span()
    article3.add(spanArticle3)

    spanArticle3.container.style.display = 'flex'
    spanArticle3.container.style.justifyContent = 'space-between'

    var description3 = new Text()
    description3.setText('Caption')
    spanArticle3.add(description3)

    var likeButton3 = new Button()
    likeButton3.setText('🤍')
    likeButton3.addClickListener(function () {
        likeButton3.container.innerText = likeButton3.container.innerText === '🤍' ? '💛' : '🤍'
    })
    spanArticle3.add(likeButton3)

    var article4 = new Article()
    this.add(article4)

    article4.container.style.display = 'flex'
    article4.container.style.flexDirection = 'column'
    article4.container.style.gap = '0.3rem'

    var username4 = new Heading(3)
    username4.setText('username4')
    article4.add(username4)

    var picture4 = new Picture()
    picture4.setSource('https://t3.ftcdn.net/jpg/08/69/02/92/240_F_869029213_2y0i0t5Y6nZmb62r2pMp6vGfObRkcTVR.jpg')
    article4.add(picture4)

    var spanArticle4 = new Span()
    article4.add(spanArticle4)

    spanArticle4.container.style.display = 'flex'
    spanArticle4.container.style.justifyContent = 'space-between'

    article4.container.style.display = 'flex'
    article4.container.style.flexDirection = 'column'
    article4.container.style.gap = '0.3rem'

    var description4 = new Text()
    description4.setText('Caption')
    spanArticle4.add(description4)

    var likeButton4 = new Button()
    likeButton4.setText('🤍')
    likeButton4.addClickListener(function () {
        likeButton4.container.innerText = likeButton4.container.innerText === '🤍' ? '💛' : '🤍'
    })
    spanArticle4.add(likeButton4)
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

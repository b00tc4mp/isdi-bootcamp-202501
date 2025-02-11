function Post(username, imgAdress, date) {
    Component.call(this, 'div')
    this.container.style.marginTop = '50px'
    this.container.style.background = 'lightblue'
    this.Username(username)
    this.Img(imgAdress)
    this.Caption()
    this.Date(date)
}

Post.prototype = Object.create(Component.prototype)
Post.prototype.constructor = Post

Post.prototype.Username = function (userName) {
    var userPost = new Heading(7)
    userPost.container.style.fontWeight = 'bold'
    userPost.setText(userName)
    this.add(userPost)
}

Post.prototype.Img = function (img) {
    var userImg = new Img()
    userImg.container.src = img
    userImg.container.style.width = '500px'
    userImg.container.style.height = '300px'
    userImg.container.style.display = 'block'
    this.add(userImg)
}

Post.prototype.Caption = function () {
    var caption = new Span()
    caption.container.style.display = 'flex'
    caption.container.style.justifyContent = 'space-between'
    caption.container.style.marginBottom = '25px'

    var captionText = new Heading(7)
    captionText.setText('Caption')
    caption.add(captionText)
    var like = new Button()
    like.setText('🤍')
    like.addClickListener(function () {
        like.container.innerText = like.container.innerText === '🤍' ? '💙' : '🤍'
    })
    caption.add(like)
    this.add(caption)
}

Post.prototype.Date = function (time) {
    var date = new Heading(7)
    date.setText(time)
    this.add(date)
}
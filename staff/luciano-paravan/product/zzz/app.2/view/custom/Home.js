function Home () {
    //debugger
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)
    
    var logout = new Button()
    logout.setText('Log out')
    logout.container.style.color = '#FFFFFF'
    logout.container.style.backgroundColor = '#428A82'
    this.add(logout)
    
    var postFrame1 = new Article()
    this.add(postFrame1)
    
    var usernamePostFrame1 = new P()
    usernamePostFrame1.setText('username1')
    postFrame1.add(usernamePostFrame1)
    
    var photoContainer1 = new Div()
    photoContainer1.container.style.width = '100%' //'440px'
    photoContainer1.container.style.height = '440px'
    postFrame1.add(photoContainer1)
    
    var photoImg1 = new Img()
    photoImg1.container.src = 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    photoImg1.container.style.objectFit = 'cover'
    photoImg1.container.style.width = '100%'
    photoImg1.container.style.height = '100%'
    photoContainer1.add(photoImg1)
    
    var commentPostFrame1 = new P()
    commentPostFrame1.setText('comment 1')
    postFrame1.add(commentPostFrame1)
    
    var postFrame2 = new Article()
    this.add(postFrame2)
    
    var usernamePostFrame2 = new P()
    usernamePostFrame2.setText('username2')
    postFrame2.add(usernamePostFrame2)
    
    var photoContainer2 = new Div()
    photoContainer2.container.style.width = '100%'
    photoContainer2.container.style.height = '440px'
    postFrame2.add(photoContainer2)
    
    var photoImg2 = new Img()
    photoImg2.container.src = 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?cs=srgb&dl=pexels-fotios-photos-1107717.jpg&fm=jpg'
    photoImg2.container.style.objectFit = 'cover'
    photoImg2.container.style.width = '100%'
    photoImg2.container.style.height = '100%'
    photoContainer2.add(photoImg2)
    
    var commentPostFrame2 = new P()
    commentPostFrame2.setText('comment 2')
    postFrame2.add(commentPostFrame2)
    
    logout.addClickListener(function () {
        body.remove(this)
        body.add(landing)
    }.bind(this))
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home
function Home() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Bee you')
    this.add(logo)

    //HOME FIRST POST

    var firstPost = new Article()
    this.add(firstPost)

    var firstPostName = new Heading(3)
    firstPostName.setText('name1')
    firstPost.add(firstPostName)
    
    var squareImg = new Component('div')
    this.add(squareImg)
    /*
    squareImg.style.width = '200px'
    squareImg.style.height = '200px'
    squareImg.style.overflow = 'hidden'
    */
    var firstPostPicture = new Image()
    firstPostPicture.setSrc ('https://imgs.search.brave.com/2EcBw2UdTyJRdsx6Gp7xfBHA0A1__0QFLtCgvSXM8HE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jaGlj/YS1lbi1waWNvLWRl/LW1vbnRhJUMzJUIx/YS1taXJhbmRvLWhl/cm1vc2FzLW1vbnRh/JUMzJUIxYXMtYWwt/YXRhcmRlY2VyLWNv/bi1oaWVyYmEtdmVy/ZGUtaGVybW9zby12/YWxsZS1uaWVibGEt/dmVyYW5vLXBhaXNh/amUtbXVqZXItam92/ZW4tMjEyMzQyMDQ4/LmpwZw')
    /*
    firstPostPicture.style.width = '50%'
    firstPostPicture.style.height = '75%'
    firstPostPicture.style.objectFit = 'cover'
    firstPostPicture.style.objectPosition = 'top'
    */
    firstPost.add(firstPostPicture)

    // HOME SECOND POST

    var secondPost = new Article()
    this.add(secondPost)

    var secondPostName = new Heading(3)
    secondPostName.setText('name2')
    secondPost.add(secondPostName)
    /*
    var squareImg2 = new Component('div')
    this.add(squareImg2)

    squareImg2.style.width = '200px'
    squareImg2.style.height = '200px'
    squareImg2.style.overflow = 'hidden'
    */
    var secondPostPicture = new Image()
    secondPostPicture.setSrc ('https://imgs.search.brave.com/IECfcLf6yGbgIjkrA3ODeCopIIl7bBMn9KCd8-fWCn8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xNS8xNC9i/ZWFjaC0xODUzNDQy/XzY0MC5qcGc')
    secondPost.add(secondPostPicture)
    /*
    secondPostPicture.style.width = '50%'
    secondPostPicture.style.height = '75%'
    secondPostPicture.style.objectFit = 'cover'
    secondPostPicture.style.objectPosition = 'top'
    */

    //logout anchor

    var logOutAnchor = new Anchor()
    logOutAnchor.setText('Logout')

    this.add(logOutAnchor)
    this.logOutAnchor = logOutAnchor
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

Home.prototype.addLogOutClickListener = function(listener) {
    this.logOutAnchor.addClickListener(listener)
}
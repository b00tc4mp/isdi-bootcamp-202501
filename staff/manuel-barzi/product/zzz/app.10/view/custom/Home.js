function Home() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var welcome = new Heading(2)
    welcome.setText('Hello, World!')
    this.add(welcome)
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home
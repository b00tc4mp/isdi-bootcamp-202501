function Home() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var welcome = new Heading(2)
    welcome.setText('Hello, World!')
    this.add(welcome)

    var logoutButton = new Button()
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
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

Home.prototype.addLogoutClickListener = function (listener) {
    this.logoutClickListener = listener
}
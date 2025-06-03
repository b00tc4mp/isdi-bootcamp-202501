function Body() {
    Component.call(this, 'body')
    this.container.style.backgroundColor = '#E5FFE6'
}

Body.prototype = Object.create(Component.prototype)
Body.prototype.constructor = Body
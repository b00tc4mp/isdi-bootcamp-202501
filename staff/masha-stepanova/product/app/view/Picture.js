function Picture() {
    Component.call(this, 'img')
}

Picture.prototype = Object.create(Component.prototype)
Picture.prototype.constructor = Picture

Picture.prototype.setSource = function (source) {
    this.container.src = source
}
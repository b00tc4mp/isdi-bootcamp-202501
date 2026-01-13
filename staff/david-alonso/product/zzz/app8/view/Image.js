// ****  IMAGE

function Image() {
    Component.call(this, 'img')
}

Image.prototype = Object.create(Component.prototype)
Image.prototype.constructor = Image

Image.prototype.setUrl = function (url) {
    this.container.src = url
}
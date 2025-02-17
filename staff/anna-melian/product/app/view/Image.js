function Image() {
    Component.call(this, 'img')
    //this.container.style.height = '300px'
    this.container.style.width = '500px'
}

Image.prototype = Object.create(Component.prototype)
Image.prototype.constructor = Image

Image.prototype.setUrl = function (url) {
    this.container.src = url
}
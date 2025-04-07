// PICTURES
function Picture() {
    Component.call(this, 'img')  // 'img' = Tag que exista en html
}

Picture.prototype = Object.create(Component.prototype)
Picture.prototype.constructor = Picture

Picture.prototype.setSrc = function (src) {
    this.container.src = src  // .src = Parametro del tag dado anteriormente
}
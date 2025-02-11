function Component(tag) {
    this.container = document.createElement(tag);
}

Component.prototype.add = function (child) {
    this.container.appendChild(child.container);
}

Component.prototype.remove = function (child) {
    this.container.removeChild(child.container);
}

Component.prototype.addClickListener = function (callback) {
    this.container.addEventListener('click', callback)
}

Component.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener('submit', callback)
}
// Component base constructor
function Component(tagName) {
    this.container = document.createElement(tagName); // Crea un nuevo elemento HTML con el tagName proporcionado
}

Component.prototype.add = function(child) {
    this.container.appendChild(child.container); // Agrega un componente hijo al contenedor
}

//falta crear contuctora romeve
Component.prototype.remove = function (child) {
    this.container.removeChild(child.container)
}


Component.prototype.addClickListener = function(callback) {
    this.container.addEventListener('click', callback); // Agrega un listener de clic al contenedor
}
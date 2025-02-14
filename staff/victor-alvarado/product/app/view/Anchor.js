// Anchor constructor (enlaces <a>)
function Anchor() {
    Component.call(this, 'a'); // Crea un enlace <a>
   
}

Anchor.prototype = Object.create(Component.prototype);
Anchor.prototype.constructor = Anchor;

Anchor.prototype.setText = function(text) {
    this.container.textContent = text // Establece el texto del enlace
}

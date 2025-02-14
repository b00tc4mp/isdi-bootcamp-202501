// Heading constructor (h1, h2, etc.)
function Heading(level) {
    Component.call(this, 'h' + level); // Crea un encabezado de un determinado nivel (h1, h2, ...)
}

Heading.prototype = Object.create(Component.prototype);
Heading.prototype.constructor = Heading; // Asegura que el constructor apunte a Heading

Heading.prototype.setText = function(text) {
    this.container.textContent = text; // Establece el texto del encabezado
}
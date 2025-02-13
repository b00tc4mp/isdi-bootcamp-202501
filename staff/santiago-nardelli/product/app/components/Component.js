// Definir la clase Component
// La clase Component es una clase base para todos los componentes de la aplicación desde ella manejamos el DOM
function Component(tagName) {
  // Crear un elemento HTML con el tagName proporcionado y asignarlo a this.container, que es una propiedad del objeto actual
  // this.container es un contenedor para el componente actual
  // aca es donde se crea el contenedor del componente del DOM
  this.container = document.createElement(tagName);
}

/* Método para agregar un hijo a un componente
 El método recibe un parámetro child que es un objeto de tipo Component
 El método agrega el contenedor del hijo al contenedor del componente actual
 El método no retorna nada
 El método no lanza errores
 El método no modifica el DOM
 Agrega un hijo al componente del DOM
*/
Component.prototype.add = function (child) {
  // Agregar el contenedor del hijo al contenedor del componente actual
  this.container.appendChild(child.container);
};

// Método para remover un hijo de un componente
Component.prototype.remove = function (child) {
  // Remover el contenedor del hijo del contenedor del componente actual
  this.container.removeChild(child.container);
};

// Método para agregar un evento click a un componente
Component.prototype.addClickListener = function (callback) {
  // Agregar un listener para el evento 'click' al contenedor del componente actual
  this.container.addEventListener("click", callback);
};

// Método para agregar efectos de pointer y hover a un componente
Component.prototype.addPointerAndHoverEffects = function () {
  // Cambiar el cursor a 'pointer' cuando el mouse está sobre el componente
  this.container.style.cursor = "pointer";

  // Agregar un listener para el evento 'mouseover' al contenedor del componente actual
  this.container.addEventListener("mouseover", function () {
    // Cambiar el color de fondo y el color del texto cuando el mouse está sobre el componente
    this.style.backgroundColor = "#0f0d4f";
    this.style.color = "#fff";
  });

  // Agregar un listener para el evento 'mouseout' al contenedor del componente actual
  this.container.addEventListener("mouseout", function () {
    // Restaurar el color de fondo y el color del texto cuando el mouse sale del componente
    this.style.backgroundColor = "#1a1a1a";
    this.style.color = "#fff";
  });
};

// Método para agregar un evento submit a un componente
Component.prototype.addSubmitListener = function (callback) {
  // el callback q le paso por parametros lo saco de la clase donde lo llamo
  // Agregar un listener para el evento 'submit' al contenedor del componente actual
  this.container.addEventListener("submit", callback);
};


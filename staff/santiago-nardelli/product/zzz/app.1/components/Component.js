// Definir la clase Component
// La clase Component es una clase base para todos los componentes de la aplicación desde ella manejamos el DOM
class Component {
  // Crear un elemento HTML con el tagName proporcionado y asignarlo a this.container, que es una propiedad del objeto actual
  // this.container es un contenedor para el componente actual
  // aca es donde se crea el contenedor del componente del DOM
  constructor(tagName) {
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
  add(child) {
    this.container.appendChild(child.container);
  }
  // Método para remover un hijo de un componente
  remove(child) {
    this.container.removeChild(child.container);
  }
  // Método para agregar un listener al evento click del componente
  addClickListener(callback) {
    this.container.addEventListener("click", callback);
  }



  addPointerAndHoverEffects() {
    this.container.style.cursor = "pointer";

    this.container.addEventListener("mouseover", function () {
      this.style.backgroundColor = "#0f0d4f";
      this.style.color = "#fff";
    });

    this.container.addEventListener("mouseout", function () {
      this.style.backgroundColor = "#1a1a1a";
      this.style.color = "#fff";
    });
  }


// Método para agregar un listener al evento submit del componente actual (que debe ser un formulario), el listener recibe una función callback que se ejecutará cuando se envíe el formulario (evento submit), el método no retorna nada, el método no lanza errores, el método no modifica el DOM y el método no agrega un listener al evento submit del formulario del componente del DOM 
  addSubmitListener(callback) {
    this.container.addEventListener("submit", callback);
  }
}

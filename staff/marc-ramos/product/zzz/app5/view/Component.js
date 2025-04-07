function Component(tagName) {
    //creamos la función constructora Component para ir creando diversas funciones
    this.container = document.createElement(tagName);
  }
  
  Component.prototype.add = function (child) {
    //creamos una funcion para crear appendChild
    this.container.appendChild(child.container)
  };
  
  Component.prototype.remove = function (child) {
    this.container.removeChild(child.container);
  };
  
  Component.prototype.addClickListener = function (callback) {
    //creamos listener
    this.container.addEventListener("click", callback);
  };
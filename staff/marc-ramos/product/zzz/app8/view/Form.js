function Form() {
    //creamos la función form para poder crear formularios con pocas lineas de codigo
    Component.call(this, "form");
  }
  
  Form.prototype = Object.create(Component.prototype);
  Form.prototype.constructor = Form;
  
  Form.prototype.addSubmitListener = function (listener) {
    this.container.addEventListener("submit", listener);
  }

  Form.prototype.clear = function() {
    this.container.reset()
  }
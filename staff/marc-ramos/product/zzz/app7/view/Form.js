function Form() {
    //creamos la función form para poder crear formularios con pocas lineas de codigo
    Component.call(this, "form");
  }
  
  Form.prototype = Object.create(Component.prototype);
  Form.prototype.constructor = Form;
  
  Form.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener("submit", callback);
  }

  Form.prototype.clear = function() {
    this.container.reset()
  }
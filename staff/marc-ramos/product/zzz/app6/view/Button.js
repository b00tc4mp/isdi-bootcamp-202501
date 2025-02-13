function Button() {
    //creamos funcion constructora de button
    Component.call(this, "button");
  }
  
  Button.prototype = Object.create(Component.prototype);
  Button.prototype.constructor = Button;
  
  Button.prototype.setType = function (type) {
    this.container.type = type;
  };
  
  Button.prototype.setText = function (text) {
    //creamos funcion para poner texto a un button
    this.container.textContent = text;
  };
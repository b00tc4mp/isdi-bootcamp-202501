function Div() {
    //creamos funcion que crea div's
    Component.call(this, "div");
  }
  
  Div.prototype = Object.create(Component.prototype);
  Div.prototype.constructor = Div;
  
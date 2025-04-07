function Heading(level) {
    //creamos funcion para heading con su level correspondiente
    Component.call(this, "h" + level);
  }
  
  Heading.prototype = Object.create(Component.prototype);
  Heading.prototype.constructor = Heading;
  
  Heading.prototype.setText = function (text) {
    //creamos texto para el heading
    this.container.textContent = text;
  };
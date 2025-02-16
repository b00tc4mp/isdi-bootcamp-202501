function Anchor() {
    //function que crea un anchor
    Component.call(this, "a");
  }
  
  Anchor.prototype = Object.create(Component.prototype);
  Anchor.prototype.constructor = Anchor;
  
  Anchor.prototype.setText = function (text) {
    //crear el texto del anchor
    this.container.textContent = text;
  };
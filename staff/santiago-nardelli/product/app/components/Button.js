//BUTTON COMPONENT
function Button() {
    Component.call(this, "button");
  }
  
  Button.prototype = Object.create(Component.prototype);
  Button.prototype.constructor = Button;
  
  Button.prototype.setType = function (type) {
    this.container.type = type;
  };
  
  Button.prototype.setText = function (text) {
    this.container.textContent = text;
  };
  
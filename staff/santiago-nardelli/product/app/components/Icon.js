//ICON COMPONENT
function Icon() {
    Component.call(this, "i");
  }
  
  Icon.prototype = Object.create(Component.prototype);
  Icon.prototype.constructor = Icon;
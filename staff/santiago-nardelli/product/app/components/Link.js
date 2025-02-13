//LINK COMPONENT
function Link() {
    Component.call(this, "a");
  }
  
  Link.prototype = Object.create(Component.prototype);
  Link.prototype.constructor = Link;
  
  Link.prototype.setText= function (text){
    this.container.text= text
  }
  
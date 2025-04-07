function Component(tagName) {
    this.container = document.createElement(tagName);
  }
  
  Component.prototype.add = function (child) {
    this.container.appendChild(child.container)
  };
  
  Component.prototype.remove = function (child) {
    this.container.removeChild(child.container);
  };
  
  Component.prototype.addClickListener = function (listener) {
    //creamos listener
    this.container.addEventListener("click", listener);
  };
  
  Component.prototype.addSubmitListener = function(listener){
    this.container.addSubmitListener('submit',listener)
  }

// ============================================CREO EL BODY=======================================================================
function Body() {
    Component.call(this, "body");
    
  
  }
  
  // Aqui digo que el portotipo del  body es un objeto que hereda de la clase Component y que el constructor de Body es la clase Body
  // Esto me permite heredar los metodos de la clase Component
  Body.prototype = Object.create(Component.prototype);
  Body.prototype.constructor = Body;
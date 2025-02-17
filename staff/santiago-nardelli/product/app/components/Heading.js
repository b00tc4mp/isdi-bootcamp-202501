class Heading extends Componet{
  constructor(level){
    super("h" + level);
  }
  setText(text){
    this.container.text = text;
  }
}
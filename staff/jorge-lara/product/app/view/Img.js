function Image(){
    Component.call(this, 'img');
}
Image.prototype = Object.create(Component.prototype);
Image.prototype.container = Image;

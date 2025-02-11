function Article(){
    Component.call(this, 'article');
}
Article.prototype = Object.create(Component.prototype);
Article.prototype.container = Article;

Article.prototype.setOrientation = function(type,orientation){
    this.container.style.display = type;
    this.container.style.flexDirection = orientation
}
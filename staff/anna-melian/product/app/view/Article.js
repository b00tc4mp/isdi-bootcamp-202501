function Article() {
    Component.call(this, 'article')
    this.container.style.marginBottom = '40px'
}

Article.prototype = Object.create(Component.prototype)
Article.prototype.constructor = Article
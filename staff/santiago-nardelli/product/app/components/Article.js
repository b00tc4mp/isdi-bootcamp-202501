function Article(){
    Component.call(this, "article");
}

Article.prototype =Object.create(Component.prototype);
Article.prototype.constructor = Article;


class Article extends Component {
    constructor() {
        super("article");
    }
}
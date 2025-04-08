class Image extends Component {
  constructor(src) {
    super("img");
    this.container.src = src;
  }

  setImageURL = function (src) {
    this.container.src = src;
  };
}

class Home extends Component {
  constructor() {
    super("div");
    this.setStyle(style.homeContainerStyle);
    const logo = new Header("1", "Logo");
    this.logo = logo;

    this.add(logo);

    const logoutButton = new Button("Logout");
    logoutButton.setStyle(style.logoutButton);
    logoutButton.addClickListener(
      function () {
        logic.setOfflineUser();
        this.logoutClickListener();
      }.bind(this)
    );
    this.add(logoutButton);

    const welcomeTextHeader = new Header(2);
    this.welcomeTextHeader = welcomeTextHeader;
    this.add(welcomeTextHeader);

    const postsSection = new Section();
    this.postsSection = postsSection;
    this.add(postsSection);

    const createPostButton = new Button("+");
    createPostButton.setStyle(style.createPostButton);
    createPostButton.addClickListener(
      function () {
        const createPost = new CreatePost();

        this.add(createPost);
        this.remove(postsSection);
        this.remove(createPostButton);
        createPost.addCreatePostSubmitListener(
          function () {
            this.setPosts(data.posts);
            this.remove(createPost);
            this.add(postsSection);
            this.add(createPostButton);
          }.bind(this)
        );
      }.bind(this)
    );

    this.add(createPostButton);

    this.createPostButton = createPostButton;
  }
  addLogoClickListener(listener) {
    this.logo.addClickListener(listener);
  }

  addLogoutClickListener(listener) {
    this.logoutClickListener = listener;
  }

  setWelcomeText(text) {
    this.welcomeTextHeader.setText(text);
  }

  setPosts() {
    this.postsSection.container.innerHTML = "";

    try {
      const posts = logic.getPosts();
      for (let i = 0; i < posts.length; i++) {
        const post = new Post(posts[i]);

        post.addLikeClickListener(
          function () {
            this.setPosts(posts);
          }.bind(this)
        );
        this.postsSection.add(post);
      }
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }
}

class Home extends Component {
  constructor() {
    super("section");
    this.container.style.display = "grid";
    this.container.style.gridTemplateAreas = `
      "sidebar navbar"
      "sidebar content"
    `;
    this.container.style.gridTemplateRows = "auto 1fr";
    this.container.style.gridTemplateColumns = " 100px auto";
    this.container.style.height = "auto";
    this.container.style.width = "100%";



    const sidebar = new Div();
    sidebar.container.style.gridArea = "sidebar";
    sidebar.container.style.display = "flex";
    sidebar.container.style.flexDirection = "column";
    sidebar.container.style.padding = "20px";
    this.add(sidebar);
    



    const logoHomeIcon = new Icon();
    logoHomeIcon.container.className = "fa-solid fa-user-secret";
    logoHomeIcon.container.style.fontSize = "50px";
    logoHomeIcon.container.style.color = "#00d4ff";
    logoHomeIcon.container.style.marginBottom = "20px";
    this.logoHomeIcon = logoHomeIcon;
    logoHomeIcon.addClickListener(function (){
      try {
        logic.logoutUser()


        this.homeClickListener()
      } catch (error) {
        console.error(error.message)

        alert(error.message)
    
      }
    }.bind(this))
    sidebar.add(logoHomeIcon);




    const logoPlusIcon = new Icon();
    logoPlusIcon.container.className = "fa-solid fa-plus";
    logoPlusIcon.container.style.fontSize = "50px";
    logoPlusIcon.container.style.color = "#00d4ff";
    logoPlusIcon.container.style.marginBottom = "20px";
    logoPlusIcon.addClickListener(function () {
      const createPost = new CreatePost();

      createPost.addCreatePostSubmitListener(function () {
        content.remove(createPost);
        //set o load??
        this.setPosts();
        content.add(postSection);
        sidebar.add(logoPlusIcon);        
      }.bind(this));


      createPost.addCancelClickListener(function () {

        content.remove(createPost);
        content.add(postSection);
        sidebar.add(logoPlusIcon);
      }.bind(this));


     content.remove(postSection);
      sidebar.remove(logoPlusIcon);
      content.add(createPost);
    }.bind(this));
    sidebar.add(logoPlusIcon);






    const logoHeartIcon = new Icon();
    logoHeartIcon.container.className = "fa-solid fa-heart";
    logoHeartIcon.container.style.fontSize = "50px";
    logoHeartIcon.container.style.color = "#00d4ff";
    logoHeartIcon.container.style.marginBottom = "20px";
    sidebar.add(logoHeartIcon);

    const logoMesseageIcon = new Icon();
    logoMesseageIcon.container.className = "fa-solid fa-comments";
    logoMesseageIcon.container.style.fontSize = "50px";
    logoMesseageIcon.container.style.color = "#00d4ff";
    logoMesseageIcon.container.style.marginBottom = "20px";
    sidebar.add(logoMesseageIcon);

    const logoSearchIcon = new Icon();
    logoSearchIcon.container.className = "fa-solid fa-magnifying-glass";
    logoSearchIcon.container.style.fontSize = "50px";
    logoSearchIcon.container.style.color = "#00d4ff";
    logoSearchIcon.container.style.marginBottom = "20px";
    sidebar.add(logoSearchIcon);

    const logoLinkIcon = new Icon();
    logoLinkIcon.container.className = "fa-solid fa-link";
    logoLinkIcon.container.style.fontSize = "50px";
    logoLinkIcon.container.style.color = "#00d4ff";
    logoLinkIcon.container.style.marginBottom = "20px";
    sidebar.add(logoLinkIcon);

    const logoMenuIcon = new Icon();
    logoMenuIcon.container.className = "fa-solid fa-bars";
    logoMenuIcon.container.style.fontSize = "50px";
    logoMenuIcon.container.style.color = "#00d4ff";
    logoMenuIcon.container.style.marginBottom = "20px";
    sidebar.add(logoMenuIcon);

    const logoSettingsIcon = new Icon();
    logoSettingsIcon.container.className = "fa-solid fa-cog";
    logoSettingsIcon.container.style.fontSize = "50px";
    logoSettingsIcon.container.style.color = "#00d4ff";
    logoSettingsIcon.container.style.marginBottom = "20px";
    sidebar.add(logoSettingsIcon);

    const navbar = new Div();
    navbar.container.style.gridArea = "navbar";
    navbar.container.style.display = "flex";
    navbar.container.style.justifyContent = "space-between";
    navbar.container.style.alignItems = "center";
    navbar.container.style.padding = "10px";
    navbar.container.style.flexDirection = "row";
    navbar.container.style.backgroundColor = "#1a1a1a";
    navbar.container.style.width = "100%";
    navbar.container.style.height = "50px";
    navbar.container.style.marginTop = "20px";
    this.add(navbar);

    for (let i = 0; i < 8; i++) {
      let navbarIcon = new Icon();
      navbarIcon.container.className = "fa-solid fa-user";
      navbarIcon.container.style.fontSize = "20px";
      navbarIcon.container.style.color = "#00d4ff";
      navbar.add(navbarIcon);
    }

    const content = new Div();
    content.container.style.gridArea = "content";
    content.container.style.display = "flex";
    content.container.style.justifyContent = "space-between";
    content.container.style.alignItems = "center";
    content.container.style.padding = "20px";
    content.container.style.flexDirection = "column";
    content.container.style.backgroundColor = "#1a1a1a";
    content.container.style.width = "100%";
    content.container.style.height = "100%";
    content.container.style.marginTop = "20px";
    this.add(content);

    const contentTitle = new Heading(1);
    contentTitle.setText("Home");
    content.add(contentTitle);

    const contentText = new Span();
    content.add(contentText);
    this.contentText = contentText;

    const postSection = new Div();
    postSection.container.style.display = "flex";
    postSection.container.style.flexDirection = "column";
    postSection.container.style.width = "600px";
    postSection.container.style.height = "auto";
    postSection.container.style.backgroundColor = "#1a1a1a";
    postSection.container.style.marginTop = "20px";
    content.add(postSection);
    //con esto permito acceder al contenedor desde la instancia de la clase
    this.postSection = postSection;
  }

  loadUserName(){
    try{
     const name= logic.getUserName()

      this.contentText.setText(`Hello ${name}`)

    }catch(error){  
      console.error(error.message)
      alert(error.message)
    }
  }

  addHomeClickListener(listener) {
    this.homeClickListener = listener
  };


  setPosts() {

    //Limpio mi ventana par acaragar nuevos post
    this.postSection.container.innerHTML = "";
    try {

     const posts = logic.getPosts();
      //Recorro los post y los agrego al contenedor como ultimo y en este caso me apareceria primero el ultimo post
      for (let i = posts.length -1 ;i > -1 ; i--) {
        const post = posts[i];
  
        const postContainer = new Article();
  
        const postTitle = new Heading(3);
        postTitle.setText(post.title);
        postContainer.add(postTitle);
  
        const postImage = new Image();
        postImage.setSrc(post.image);
        postContainer.add(postImage);
  
        const postText = new Paragraph();
        postText.setText(post.text);
        postContainer.add(postText);
  
        const postDate = new Time();
        postDate.setText(post.createdAt.toISOString());
        postContainer.add(postDate);

        const postLikesButton = new Button();
        postLikesButton.setText(`Likes: ${post.likes.length}`)
        postLikesButton.container.style.backgroundColor = "#00d4ff";
        postLikesButton.container.style.color = "white";
        postLikesButton.container.style.border = "none";
        postLikesButton.container.style.borderRadius = "5px";
        postLikesButton.container.style.padding = "10px";
        postLikesButton.container.style.marginTop = "10px";
        postLikesButton.container.style.cursor = "pointer";
        

        postContainer.add(postLikesButton)

        postLikesButton.addClickListener(function(){
          
          try {

            logic.toggleLikePost(post.id)
              
            this.setPosts()
          } catch (error) {
            console.error(error.message)
            alert(error.message)
            
          }
      
         
         }.bind(this))
  
        this.postSection.add(postContainer);
      }
      
    } catch (error) {

      console.error(error.message)

      alert(error.message)
      
    }
  };
}

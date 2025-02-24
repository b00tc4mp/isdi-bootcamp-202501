const { useState, useEffect } = React

function Home({ onLogoutClick }) {
    const [view, setView] = useState('posts')
    const [userName, setUserName] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            const name = logic.getUserName()
            const posts = logic.getPosts()

            setUserName(name)
            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onLogoutClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleAddPostClick = () => setView('create-post')

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {image: {value: image}, text: { value: text }} = form

            logic.createPost(image, text)

            const posts = logic.getPosts()

            setPosts(posts)
            setView('posts')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Home -> render')

    return <div>
      <h1>Home</h1>

      <h2>Hello, {userName}!</h2>

      <button type='button' onClick={handleLogoutClick}>Logout</button>

      {view === 'posts' && <section>
          {posts.map(post => 
              <article>
                <h3>{post.author}</h3>

                <img src={post.image} />

                <p>{post.text}</p>

                <time>{post.createdAt.toISOString()}</time>

                <button>{`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`}</button>
          </article>)}
      </section>}

      {view === 'create-post' && <section>
            <form onSubmit={handleCreatePostSubmit}>
                <label htmlFor="image">Image</label>
                <input type="url" id="image" />

                <label htmlFor="text">Text</label>
                <input type="text" id="text" />

                <button type="submit">Create</button>
            </form>

            <a>Cancel</a>
        </section>}

        {view === 'posts' && <button onClick={handleAddPostClick}>+</button>}
    </div>
}

/*
class Home extends Component {
  constructor() {
    super('div')
  
    const logo = new Heading(1);
    logo.setText('Home of DEEPSTAGRAM');
    this.add(logo);
  
    const welcome = new Heading(2);
    welcome.setText("Welcome to DEEPSTAGRAM");
    this.add(welcome)
    this.welcome = welcome

    const logoutButton = new Button()
    logoutButton.setText('Logout')
    logoutButton.addClickListener(() => {
      try {
        logic.logoutUser()

        this.logoutButton()
      } catch (error) {
        console.error(error)

        alert(error.message)
      }
    })

    this.add(logoutButton)

    const postsSection = new Section()
    this.add(postsSection)
    this.postsSection = postsSection

    const addPostButton = new Button()
    addPostButton.setText('+')
    addPostButton.addClickListener(() => {
      const createPost = new CreatePost()

      createPost.addCreatePostSubmitListener(() => {
        this.remove(createPost)

        this.loadPosts()
        this.add(postsSection)
        this.add(addPostButton)
      })

      createPost.addCancelClickListener(() => {
        this.remove(createPost)
        this.add(postsSection)
        this.add(addPostButton)
      })

      this.remove(postsSection)
      this.remove(addPostButton)
      this.add(createPost)
    })
    this.add(addPostButton)
  }
    addLogoutClickListener (listener) {
    this.logoutButton = listener
  }

    loadUserName () {
    try {
      const name = logic.getUserName()

      this.welcome.setText(`Hello, ${name} !`)
    } catch(error) {
      console.error(error)

      alert(error.message)
    }
  }

    loadPosts() {
    this.postsSection.container.innerHTML = ''

    try {
      const posts = logic.getPosts()

      for (let i = posts.length - 1; i > -1; i--) {
        const post = posts[i]
  
        const postArticle = new Article()
  
        const authorHeading = new Heading(3)
        authorHeading.setText(post.author)
        postArticle.add(authorHeading)
  
        const postImage = new Image()
        postImage.setUrl(post.image)
        postArticle.add(postImage)
  
        const postText = new Paragraph()
        postText.setText(post.text)
        postArticle.add(postText)
  
        const postDate = new Time()
        postDate.setText(post.createdAt.toISOString())
        postArticle.add(postDate)

        const likeButton = new Button()
        likeButton.setText(`${post.liked ? '♥️' : '🤍'} (${post.likesCount})`)
        likeButton.addClickListener(() => {
          try {
            logic.toggleLikePost(post.id)

            this.loadPosts()
          } catch (error) {
            console.error(error)

            alert(error.message)
          }
        })
        postArticle.add(likeButton)
  
        this.postsSection.add(postArticle)
      }
    } catch(error) {
      console.error(error)

      alert(error.message)
    }
  }
}
*/
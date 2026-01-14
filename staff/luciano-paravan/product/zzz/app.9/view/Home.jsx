const { useState } = React

function Home () {
    const [view, setView] = useState('posts')




    return <div>
            <h1>Logo</h1>
            
            <h2>Hello, Juan!</h2>
            
            <button>Log out</button>
            
            {view === 'posts' && <section>
                <article>
            
                    <h3>m76elc08759</h3>
            
                    <img src="https://media.giphy.com/media/Lwlp1X2aC9gEU/giphy.gif?cid=ecf05e47y607uq53yx9gslpkgf2hnedutl1l8xg09g1i9rb7&amp;ep=v1_gifs_search&amp;rid=giphy.gif&amp;ct=g" />
            
                    <p>ehhhhh</p>
            
                    <time>2025-02-14T23:00:00.000Z</time>
                    
                    <button>🤍(0)</button>
                </article>
                
                <article>
                    <h3>m76eksz2o6</h3>
                
                    <img src="https://media.giphy.com/media/26FeZcg6jACh840dq/giphy.gif?cid=790b7611ncwkumxyi9bcgwg06xfsbtbed45ukmbhmy4btgkv&amp;ep=v1_gifs_search&amp;rid=giphy.gif&amp;ct=g" />
                
                    <p>The best</p>
                
                    <time>2024-12-31T23:00:00.000Z</time>
                
                    <button>🤍(2)</button>
                </article>
            </section>}
            

            {view === 'create-post' && <div>
                <h1>Logo</h1>
                <h2>Hello, Juan!</h2>
                <button >Log out</button>
                <section>
                    <form>
                        <label></label>
                        <input type="url" />
                        <label></label>
                        <input type="text" />
                        <button type="submit">Create</button>
                    </form>
                    <a>Cancel</a>
                </section>
            </div>}

            {view === 'posts' && <button>+</button>}
        </div>
}
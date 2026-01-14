function Home() {
    const products = data.products

    const handleProfileClick = () => {

    }

    const handleLikeClick = () => {

    }

    const handleAddToCartClick = (productId) => {
        try {
            logic.addToCart(productId)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <div>
        <section className="header" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", gap: "0.3rem" }}>

            <h1>Store Logo</h1>
            {/* <h3>Welcome, {userName}</h3> */}
            <button onClick={handleProfileClick}>🤴🏻</button>
        </section>

        {<section> {products.map(product => <article>
            <h3>{product.name}</h3>

            <img src={product.image} />

            <section>
                <p>{product.price}€</p>
                <button className="like" onClick={() => handleLikeClick(product.id)}>{`${product.liked ? '❤️' : '🤍'}`}</button>
                <button onClick={() => handleAddToCartClick(product.id)}>🛒</button>
            </section>

        </article>)}
        </section>
        }

    </div >
}
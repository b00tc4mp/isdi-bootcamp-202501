function SeeCart({ returnClick }) {
    const [cart, setCart] = useState([])


    console.debug('Store ---> See cart')

    const handleReturnClick = () => {
        returnClick()
    }


    const handleRemoveCartClick = (product, name) => {
        logic.removeProductCart(product)
        setCart(data.cart)
        //alert(`${name} remove form the cart`)

    }


    useEffect(() => {
        setCart(data.cart)

    }, [cart])

    return <>
        <h1>Cart</h1>
        <button onClick={handleReturnClick}>Return</button>
        <section>
            {cart.map((product, index) => (
                <div key={index}>
                    <h3>{product.name}</h3>
                    {/* Comprobamos si el producto tiene imagen antes de mostrarla */}
                    {product.image ? (
                        <img src={product.image} alt={product.name} width="200px" />
                    ) : (
                        <p>No image available</p>
                    )}
                    <details>
                        <summary>More Information</summary>
                        <p>Price: {product.price} €</p>
                        <p>Type: {product.type}</p>

                    </details>
                    <button onClick={() => handleRemoveCartClick(product, product.name)}>Remove product from the cart</button>

                </div>
            ))}

        </section>


    </>

}
function SeeCart({ returnClick }) {
    const [cart, setCart] = useState([])


    console.debug('Store ---> See cart')

    const handleReturnClick = () => {
        returnClick()
    }


    const handleRemoveCartClick = (product) => {
        const updatedCart = cart.filter(item => item !== product);
        setCart(updatedCart);
        logic.removeProductCart(product)


    }


    useEffect(() => {
        setCart(data.cart)

    }, [data.cart])

    return <>
        <h1>Cart</h1>
        <button onClick={handleReturnClick}>Return</button>
        <section>
            {/* Condición para verificar si el carrito está vacío */}
            {cart.length === 0 ? (
                <p>Cart is empty</p> // Mostrar este mensaje si el carrito está vacío
            ) : (
                // Mostrar los productos si el carrito no está vacío
                cart.map((product, index) => (
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
                        <button onClick={() => handleRemoveCartClick(product)}>
                            Remove product from the cart
                        </button>
                    </div>
                ))
            )}
        </section>


    </>

}

function ShowProducts({ returnClick }) {
    const [products, setProducts] = useState([])

    console.debug('Store ---> Show products')

    const handleReturnClick = () => {
        returnClick()
    }

    useEffect(() => {
        setProducts(data.products)

    }, [])

    return <>
        <h1>Products</h1>
        <button onClick={handleReturnClick}>Return</button>
        <section>
            {products.map((product, index) => (
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

                </div>
            ))}

        </section>


    </>

}

function SearchProduct({ returnClick }) {
    const [product, setProduct] = useState('')
    const [results, setResults] = useState([])
    console.debug('Store ---> Search Product')

    const handleSubmit = (event) => {
        event.preventDefault()

        const domForm = event.target

        const domOptionInput = domForm.querySelector('input[name=product]')
        const product = domOptionInput.value
        try {
            logic.helper.invalidText(product)
            const search = product
            setProduct(search)
            const results = logic.searchResults(product)
            setResults(results)

            console.log('User search: ', search);

            domForm.reset()




        } catch (error) {
            alert(error.message);
            console.error(error)
            setProduct('')
        }

    }

    const handleReturnClick = () => {
        returnClick()
    }


    const handleAddCartClick = (product) => {
        logic.addProductToCart(product)


    }


    return <>
        <h2>Search a product</h2>
        <form onSubmit={handleSubmit}>
            <label>Enter the product name: </label>
            <input type="text" name="product"></input>
            <button type="submit">Search</button>
        </form>
        <button onClick={handleReturnClick}>Return</button>
        {results.length != 0 && <section>
            {results.map((product, index) => (
                <div key={index}>
                    <h3>{product.name}</h3>
                    {/* Comprobamos si el producto tiene imagen antes de mostrarla */}
                    {product.image ? (
                        <img src={product.image} alt={product.name} width="200px" />
                    ) : (
                        <p>No image available</p>
                    )}
                    <button onClick={() => handleAddCartClick(product)}>Add product to the cart</button>
                    <details>
                        <summary>More Information</summary>
                        <p>Price: {product.price} €</p>
                        <p>Type: {product.type}</p>

                    </details>
                </div>
            ))}

        </section>}




    </>



}
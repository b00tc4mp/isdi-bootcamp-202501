function Menu({ handleSubmitMenu }) {

    console.debug('Store ---> Menu')

    const handleSubmit = (event) => {
        event.preventDefault()

        const domForm = event.target

        const domOptionInput = domForm.querySelector('select[name=userAnswer]')
        const userAnswer = domOptionInput.value
        try {


            handleSubmitMenu(userAnswer)

            domForm.reset()



        } catch (error) {
            alert(error.message);
            console.error(error)
            setOption()
        }

    }

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '200px'
    }
    return <div>
        <h1>Menu</h1>

        <form style={formStyle} onSubmit={handleSubmit}>
            <label>What do you want to do?</label>
            <select name="userAnswer">
                <option value="" defaultValue={''}>Please choose an option</option> {/* Primera opción vacía */}
                <option value="seeProducts">0: SEE THE PRODUCTS</option>
                <option value="searchProduct">1: SEARCH A PRODUCT</option>
                <option value="createNewProduct">2: CREATE A NEW PRODUCT</option>
                <option value="addProductToCart">3: ADD A PRODUCT TO THE CART</option>
                <option value="seeCart">4: SEE THE CART</option>
                <option value="generateRecipt">5: GENERATE A RECIPT</option>
                <option value="seeBuyingHistory">6: SEE BUYING HISTORY</option>
            </select>
            <button type="submit">Enter</button>
        </form>
    </div>
}

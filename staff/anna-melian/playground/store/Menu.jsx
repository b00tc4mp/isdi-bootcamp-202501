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
                <option value="" defaultValue={''}>Please choose an option</option>
                <option value="seeProducts">SEE THE PRODUCTS</option>
                <option value="searchProduct">SEARCH A PRODUCT</option>
                <option value="createNewProduct">CREATE A NEW PRODUCT</option>
                <option value="seeCart">SEE THE CART</option>
                <option value="generateRecipt">GENERATE A RECIPT</option>
                <option value="seeBuyingHistory">SEE BUYING HISTORY</option>
            </select>
            <button type="submit">Enter</button>
        </form>
    </div>
}

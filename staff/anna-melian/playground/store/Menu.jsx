function Menu({ handleSubmitMenu }) {

    console.log('Store ---> Menu')

    const handleSubmit = (event) => {
        event.preventDefault()

        const domForm = event.target

        const domOptionInput = domForm.querySelector('input[name=userAnswer]')
        const userAnswer = domOptionInput.value
        try {
            logic.helper.invalidMenuOption(userAnswer)
            const optionChose = Number(userAnswer)

            console.log('Valid answer: ', optionChose);

            handleSubmitMenu(optionChose)

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
            <input type="number" name="userAnswer"></input>
            <button type="submit">Enter</button>
        </form>
        <div name='menuOptions'>
            <p name='0'>0: SEE PRODUCTS</p>
            <p name='1'>1: SEARCH A PRODUCT</p>
            <p name='2'>2: CREATE A NEW PRODUCT</p>
            <p name='3'>3: ADD PRODUCT TO THE CART</p>
            <p name='4'>4: SEE CART</p>
            <p name='5'>5: GENERATE RECIPT</p>
            <p name='6'>6: SEE BUYING HISTORY</p>
        </div>
    </div>
}

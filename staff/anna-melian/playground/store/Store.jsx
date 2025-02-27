
const { useState, useEffect } = React

function Store() {
    const [view, setView] = useState('menu')
    const [userOption, setUserOption] = useState('')

    useEffect(() => {
        console.debug('Store start-render')
    }, [])

    function handleSubmitMenu(option) {
        setUserOption(option)

    }

    useEffect(() => {
        if (userOption === 'seeProducts') {
            setView('showProducts')
            setUserOption('')
        } else if (userOption === 'searchProduct') {
            setView('searchProduct')
            setUserOption('')
        }
    }, [userOption])

    function returnClick() {
        setView('menu')
    }




    return <>
        <h1>Hello Store</h1>
        {view === 'menu' && <Menu handleSubmitMenu={handleSubmitMenu} />}
        {view === 'showProducts' && <ShowProducts returnClick={returnClick} />}
        {view === 'searchProduct' && <SearchProduct returnClick={returnClick} />}
    </>

}



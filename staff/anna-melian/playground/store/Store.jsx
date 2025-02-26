
const { useState, useEffect } = React

function Store() {
    const [view, setView] = useState('menu')
    const [userOption, setUserOption] = useState(null)

    useEffect(() => {
        console.debug('Store start-render')
    }, [])

    function handleSubmitMenu(option) {
        setUserOption(option)

    }

    useEffect(() => {
        if (userOption === 0) {
            setView('showProducts')
            setUserOption(null)
        }
    }, [userOption])

    function returnClick() {
        setView('menu')
    }




    return <>
        <h1>Hello Store</h1>
        {view === 'menu' && <Menu handleSubmitMenu={handleSubmitMenu} />}
        {view === 'showProducts' && <ShowProducts returnClick={returnClick} />}
    </>

}




const { useState, useEffect } = React

function Store() {
    const [view, setView] = useState('menu')


    useEffect(() => {
        console.debug('Store start-render')
    }, [])

    function handleSubmitMenu(option) {
        if (option != '')
            setView(option)

    }

    useEffect(() => {
        console.debug('Store updated-render')
    }, [view])


    function returnClick() {
        setView('menu')
    }




    return <>
        <h1>Hello Store</h1>
        {view === 'menu' && <Menu handleSubmitMenu={handleSubmitMenu} />}
        {view === 'seeProducts' && <ShowProducts returnClick={returnClick} />}
        {view === 'searchProduct' && <SearchProduct returnClick={returnClick} />}
        {view === 'seeCart' && <SeeCart returnClick={returnClick} />}
    </>

}



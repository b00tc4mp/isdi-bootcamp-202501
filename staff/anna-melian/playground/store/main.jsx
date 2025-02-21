let rootElement = document.querySelector('div#root')
let root = ReactDOM.createRoot(rootElement)





function Store() {
    const option = data.userOption
    let view = <Menu />
    if (!option) {
        view = <Menu />
        logic.WhatsUserElection()
    }
    if (option === 0)
        view = <SeeProducts />

    return <>
        {view}
    </>

}

root.render(<main />)
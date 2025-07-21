export const Alert = ({ title, message, onAccepted }) => {
    const handleAcceptClick = () => onAccepted()

    console.debug('Alert -> render')

    return <>
        <div className="w-screen h-screen fixed top-0 bg-black opacity-80"></div>    
        <div className="w-screen h-screen fixed top-0  flex justify-center items-center">
            <div className="border-2 p-2 flex flex-col bg-black">    
                <h2 className="text-2xl">{title}</h2>

                <p>{message}</p>

                <button type="button" onClick={handleAcceptClick}>Accept</button>
            </div>
        </div>
    </>
}

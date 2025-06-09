export const Alert = ({ title, message, onAccepted }) => {
    const handleAcceptClick = () => onAccepted()

    console.debug('Alert -> render')

    return (
        <>
            <div></div>
            <div>
                <div>
                    <h2>{title}</h2>
                    <p>{message}</p>
                    <button type="button" onClick={handleAcceptClick}>Accept</button>
                </div>
            </div>
        </>
    )
}

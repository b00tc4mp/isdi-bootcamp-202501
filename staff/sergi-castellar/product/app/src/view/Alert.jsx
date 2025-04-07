export const Alert = ({ title, message, onAccepted }) => {
    const handleAcceptClick = () => onAccepted()

    return <>
        <div className=""></div>
        <div className="">
            <div className="">
                <h2 className="">{title}</h2>

                <p>{message}</p>

                <button type="button" onClick={handleAcceptClick}>Accept</button>
            </div>
        </div>
    </>
}
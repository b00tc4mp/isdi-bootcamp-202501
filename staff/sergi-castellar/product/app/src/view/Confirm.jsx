export const Confirm = ({ title, message, onAccepted, onCancelled }) => {
    const handleAcceptClick = () => onAccepted()
    
    const handleCancelClick = () => onCancelled()

    return <>
        <div className=""></div>
        <div className="">
            <div className="">
                <h2 className="">{title}</h2>

                <p>{message}</p>

                <button type="button" onClick={handleCancelClick}>Cancel</button>
                <button type="button" onClick={handleAcceptClick}>Accept</button>
            </div>
        </div>
    </>
}
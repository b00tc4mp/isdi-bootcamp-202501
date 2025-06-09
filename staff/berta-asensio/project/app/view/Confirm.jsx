export const Confirm = ({ title, message, onAccepted, onCancelled }) => {
    const handleCancelClick = () => onCancelled()

    const handleAcceptClick = () => onAccepted()

    return (
        <>
            <div></div>
            <div>
                <div>
                    <h2>{title}</h2>
                    <p>{message}</p>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                    <button type="button" onClick={handleAcceptClick}>Accept</button>
                </div>
            </div>
        </>
    )
}
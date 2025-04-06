export const Confirm = ({ title, message, onAccepted, onCancelled }) => {
    const handleCancelClick = () => onCancelled()

    const handleAcceptClick = () => onAccepted()

    console.debug('Confirm -> render')

    return <>
        <div>
            <div>
                <div>
                    <h2 className="text-2xl">{title}</h2>

                    <p>{message}</p>

                    <button className="secondary" type="button" onClick={handleCancelClick}>Cancel</button>

                    <button type="button" onClick={handleAcceptClick}>Accept</button>
                </div>
            </div>
        </div>

    </>
}
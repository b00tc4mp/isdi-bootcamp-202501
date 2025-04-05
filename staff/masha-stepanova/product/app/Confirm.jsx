export const Confirm = ({ title, message, onAccepted, onCancelled }) => {
    const handleCancelClick = () => onCancelled()

    const handleAcceptClick = () => onAccepted()

    return <>
        <div className="w-screen h-screen fixed top-0 bg-black opacity-80"></div>
        <div className="w-screen h-screen fixed top-0  flex justify-center items-center">
            <div className="border-2 p-2 flex flex-col bg-[var(--bg-color)]">
                <h2 className="flex justify-center">{title}</h2>

                <p>{message}</p>

                <button type="button" onClick={handleCancelClick}>Cancel</button>
                <button type="button" onClick={handleAcceptClick}>Accept</button>
            </div>
        </div>
    </>
}
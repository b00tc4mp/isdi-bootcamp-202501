export const Confirm = ({ title, message, onAccepted, onCancelled }) => {
    const handleCancelClick = () => onCancelled()

    const handleAcceptClick = () => onAccepted()

    return <>
        <div className="w-screen h-screen fixed top-0 bg-black opacity-70"></div>

        <div className="w-screen h-screen fixed top-0  flex justify-center items-center">

            <div className="w-50 border-2 border-[var(--primary-color)] p-2 flex flex-col bg-[var(--form-color)] rounded-xl">

                <h2 className="text-2xl">{title}</h2>

                <p>{message}</p>

                <button type="button" onClick={handleAcceptClick} className="button">Accept</button>
            </div>
        </div>
    </>
}
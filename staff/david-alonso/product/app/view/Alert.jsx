export const Alert = ({ title, message, onAccepted }) => {
    const handleAcceptClick = () => onAccepted()

    console.debug('Alert -> render')

    return <>
        <div className="">

            <div className="">

                <div className="">
                    <h2 className="text-2xl">{title}</h2>

                    <p>{message}</p>

                    <button type="button" onClick={handleAcceptClick}>Accept</button>
                </div>

            </div>

        </div>

    </>
}
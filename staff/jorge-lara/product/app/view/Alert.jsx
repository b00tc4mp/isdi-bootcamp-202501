export const Alert = ({ title, message, onAccepted }) => {
    const handleAcceptClick = () => onAccepted()

    return <>
        <div className='w-screen h-screen fixed top-0 bg-black opacity-80' />

        <div className='w-screen h-screen fixed top-0 flex justify-center items-center'>
            <div className='border-2 p-2 flex flex-col bg-black'>
                <h3 className='text-2xl'>{title}</h3>

                <p>{message}</p>

                <button type="button" onClick={handleAcceptClick}>Accept</button>
            </div>
        </div>
    </>
}
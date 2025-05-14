export const Alert = ({ title, message, onAccepted }) => {
    const handleAcceptClick = () => onAccepted()

    console.debug('Alert -> render')

    return <>
        <div className="w-screen h-screen fixed top-0 bg-black opacity-80"></div>
        <div className="w-screen h-screen fixed top-0 flex justify-center items-center">
            <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-3xl font-semibold text-center text-fuchsia-900 mb-4">{title}</h2>
                <p className="text-lg text-center text-gray-700 mb-6">{message}</p>

                <div className="flex justify-center space-x-4">
                    <button
                        type="button"
                        onClick={handleAcceptClick}
                        className="px-6 py-2 bg-fuchsia-600 text-white font-bold rounded-lg hover:bg-fuchsia-700 transition duration-300"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    </>
}
export const Alert = ({ title, message, onAccepted }) => {

    const handleAcceptClick = () => onAccepted()
    return <>
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-brightness-50 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm mx-4">

                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{title}</h2>

                <p className="text-gray-700 mb-6 text-center">{message}</p>

                <div className="flex justify-center">
                    <button type="button" onClick={handleAcceptClick} className="cursor-pointer px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300">Accept</button>
                </div>
            </div>
        </div>
    </>
}
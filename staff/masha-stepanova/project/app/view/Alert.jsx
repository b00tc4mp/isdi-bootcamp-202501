export const Alert = ({ title, message, onAccepted }) => {
    const handleAcceptClick = () => onAccepted()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white border border-purple-300 shadow-xl rounded-xl p-6 max-w-sm w-full text-center space-y-4">
                <h2 className="text-xl font-bold text-purple-800">{title}</h2>
                <p className="text-purple-700">{message}</p>
                <button
                    type="button"
                    onClick={handleAcceptClick}
                    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition"
                >
                    Aceptar
                </button>
            </div>
        </div>
    )
}

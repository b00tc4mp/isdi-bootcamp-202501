export const Confirm = ({ title, message, onAccepted, onCancelled }) => {
    const handleCancelClick = () => onCancelled()

    const handleAcceptClick = () => onAccepted()

    return (
        <>
            <div className="fixed inset-0 bg-green-200/80 backdrop-blur-sm z-40"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-green-100 rounded-xl p-6 shadow-lg max-w-sm w-full text-center">
                    <h2 className="text-2xl font-bold text-green-900 mb-4">{title}</h2>
                    <p className="text-green-800 mb-6">{message}</p>
                    <div className="flex justify-center gap-4">
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            className="bg-red-200 hover:bg-red-300 text-red-800 font-semibold px-4 py-2 rounded-md transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleAcceptClick}
                            className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold px-4 py-2 rounded-md transition"
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
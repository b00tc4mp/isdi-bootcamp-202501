export const Confirm = ({ title, message, onAccepted, onCancelled }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-40">
            <div className="bg-white bg-opacity-90 border border-purple-300 shadow-xl rounded-xl p-6 max-w-sm w-full text-center space-y-4">
                <h2 className="text-xl font-bold text-purple-800">{title}</h2>
                <p className="text-purple-700">{message}</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        type="button"
                        onClick={onCancelled}
                        className="bg-white border border-purple-400 text-purple-700 font-semibold py-2 px-4 rounded-full hover:bg-purple-50 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onAccepted}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    )
}

export const Confirm = ({ title, message, onAccepted, onCancelled }) => {
    const handleCancelClick = () => onCancelled()

    const handleAcceptClick = () => onAccepted()

    return (
        <>
            <div className="w-screen h-screen fixed top-0 bg-black opacity-80"></div>

            <div className="fixed inset-0 flex justify-center items-center z-50">
                <div className="bg-white rounded-xl shadow-xl p-6 w-[300px] text-center space-y-4 border border-fuchsia-300">
                    <h2 className="text-2xl font-bold text-fuchsia-800">{title}</h2>
                    <p className="text-gray-700">{message}</p>

                    <div className="flex justify-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={handleAcceptClick}
                            className="px-4 py-2 bg-fuchsia-700 hover:bg-fuchsia-600 text-white rounded-lg transition"
                        >
                            Accept
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                        >
                            Cancel
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}
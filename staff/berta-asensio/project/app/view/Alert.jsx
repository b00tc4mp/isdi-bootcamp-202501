export const Alert = ({ title, message, onAccepted }) => {
    const handleAcceptClick = () => onAccepted()

    console.debug('Alert -> render')

    return (
        <>
            <div className="fixed inset-0 bg-green-200/80 backdrop-blur-sm z-40"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-green-100 rounded-xl p-6 shadow-lg max-w-sm w-full text-center">
                    <h2 className="text-2xl font-bold text-green-900 mb-4">{title}</h2>
                    <p className="text-green-800 mb-6">{message}</p>
                    <button 
                        type="button" 
                        onClick={handleAcceptClick}
                        className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold px-5 py-2 rounded-md transition"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </>
    )
}

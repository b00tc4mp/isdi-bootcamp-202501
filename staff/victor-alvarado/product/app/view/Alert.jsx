export const Alert = ({ title, message, onAccepted }) => {
    const handleAcceptClick = () => onAccepted();

    console.debug('Alert -> render');

    return (
        <>
            {/* Fondo oscuro semitransparente detrás de la alerta */}
            <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-70 z-40"></div>

            {/* Contenedor centrado de la alerta */}
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
                <div className="bg-white/10 border-[3px] border-black p-6 rounded-xl shadow-[5px_5px_0_black] shadow-[10px_10px_0_red] max-w-md w-[90%] text-white text-center space-y-4">
                    {/* Título estilo h1 */}
                    <h2 className="font-['Jersey_15'] text-yellow-500 text-4xl drop-shadow-[3px_3px_0_black]">
                        {title}
                    </h2>

                    {/* Mensaje */}
                    <p className="text-lg">{message}</p>

                    {/* Botón con los estilos cartoon */}
                    <button
                        type="button"
                        onClick={handleAcceptClick}
                        className="font-sans text-[1.2rem] bg-red-500 text-yellow-500 p-[12px_20px] border-[3px] border-black rounded-[10px] cursor-pointer uppercase shadow-[5px_5px_0_black] shadow-[10px_10px_0_yellow] transition-all duration-200 hover:bg-yellow-500 hover:text-red-500 active:scale-[0.95]"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </>
    );
};
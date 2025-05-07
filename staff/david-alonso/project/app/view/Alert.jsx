import { OctagonAlert } from "lucide-react"


export const Alert = ({ title, message, onAccepted }) => {
    const handleAcceptClick = () => onAccepted();

    console.debug('Alert -> render');

    return (
        <>
            <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-80 z-40"></div>

            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
                <div className="p-6 w-60 flex flex-col gap-4 bg-gray-600 rounded-lg text-white">

                    <div className="flex justify-center">
                        <OctagonAlert size={35} color="red" />
                    </div>

                    <h2 className="text-2xl font-bold">{title}</h2>

                    <p>{message}</p>

                    <button
                        type="button"
                        onClick={handleAcceptClick}
                        className="px-4 py-2 bg-white text-black rounded-md mt-2"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </>
    );
}

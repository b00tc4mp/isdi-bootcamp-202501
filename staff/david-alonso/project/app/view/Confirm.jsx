import { ThumbsUp } from "lucide-react"


export const Confirm = ({ title, message, onAccepted, onCancelled }) => {
    const handleCancelClick = () => onCancelled()

    const handleAcceptClick = () => onAccepted()

    return <>
        <div className="w-screen h-screen fixed top-0 bg-black opacity-80 z-40"></div>
        <div className="w-screen h-screen fixed top-0  flex justify-center items-center z-50">
            <div className="p-10 w-60 gap-4 flex flex-col bg-gray-600 rounded-lg">

                <div className="flex justify-center">
                    <ThumbsUp size={35} color="orange" />
                </div>

                <h2 className="text-2xl font-bold">{title}</h2>

                <p>{message}</p>

                <button type="button" onClick={handleCancelClick}>Cancel</button>
                <button type="button" onClick={handleAcceptClick}>Accept</button>
            </div>
        </div>
    </>
}
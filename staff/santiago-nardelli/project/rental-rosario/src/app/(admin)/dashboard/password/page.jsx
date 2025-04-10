export default function Password(){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Change Password</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                <input
                    type="password"
                    placeholder="New Password"
                    className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                    Change Password
                </button>
            </form>
        </div>
    )
}
export default function Dashboard(){
    return(
        <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p className="text-gray-600">Welcome to the admin dashboard!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Users</h2>
                <p className="text-gray-600">Manage and view user data.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Orders</h2>
                <p className="text-gray-600">Track and manage orders.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Reports</h2>
                <p className="text-gray-600">View system reports and analytics.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Settings</h2>
                <p className="text-gray-600">Configure system settings.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Notifications</h2>
                <p className="text-gray-600">Manage notifications and alerts.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Support</h2>
                <p className="text-gray-600">Access support and help resources.</p>
            </div>
        </div>
        </>
    )
}
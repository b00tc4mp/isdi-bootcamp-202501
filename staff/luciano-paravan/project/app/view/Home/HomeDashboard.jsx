import { Navigate } from "react-router-dom";

export function HomeDashboard({ onUserLoggedOut }) {

    return <>
        <button onClick={onUserLoggedOut} className="btn-primary">Logout</button>

        <a onClick={handleAddClothingItem} className="btn-link">Add Clothing Item</a>
        <a onClick={handleLookRequest} className="btn-link">Look Request</a>
    </>
}
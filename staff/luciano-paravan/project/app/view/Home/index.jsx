import { Routes, Route } from 'react-router-dom'

export function Home({onUserLoggedOut}) {
    return <>
        <Routes>
            <Route path="/" element={<HomeDashboard onUserLoggedOut={onUserLoggedOut} />} />
            <Route path="/add-clothing-item" element={<AddClothingItem />} />
            <Route path="/request-look" element={<RequestLook />} />
            <Route path="/look-suggestion" element={<LookSuggestion />} />
        </Routes>
    </>
}
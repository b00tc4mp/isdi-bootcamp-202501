export function Modal({ children }) {
    return (
        <div className="flex items-center justify-center fixed inset-0 bg-white/30 backdrop-brightness-50 z-50">
            <div onClick={(e) => e.stopPropagation()}>

                {children}
            </div>
        </div>
    )
}
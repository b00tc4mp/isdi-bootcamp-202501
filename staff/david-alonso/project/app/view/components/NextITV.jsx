import { DateTime } from 'luxon'
import { TriangleAlert } from "lucide-react"

export function NextITV({ itvDate }) {
    const nextITVDate = DateTime.fromISO(itvDate).plus({ year: 1 })
    const timeToNextITV = nextITVDate.diff(DateTime.now().startOf('day'), ['months', 'days']).toObject()

    if (timeToNextITV.months >= 1) {
        return (
            <div className="flex flex-col p-1 pl-3 mb-5 rounded-md">
                <h2 className="text-gray-100 text-sm">PROXIMA ITV</h2>
                <div className="flex justify-between">
                    <p>Dentro de {timeToNextITV.months} {Math.floor(timeToNextITV.months) <= 1 ? 'mes' : 'meses'}</p>
                </div>
            </div>
        )
    } else if (timeToNextITV.months >= 0 && timeToNextITV.months < 1) {
        const showAlert = timeToNextITV.days < 7

        if (timeToNextITV.days >= 1) {
            return (
                <div className={`flex flex-col p-1 pl-3 mb-5 rounded-md ${showAlert ? "bg-red-500" : "bg-amber-500"}`}>
                    <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
                    <div className="flex justify-between">
                        <p>Dentro de {Math.floor(timeToNextITV.days)} {Math.floor(timeToNextITV.days) <= 1 ? 'día' : 'días'}</p>
                        {showAlert && <TriangleAlert className="-mt-2.5 mr-15" />}
                    </div>
                </div>
            )
        } else if (timeToNextITV.days >= 0 && timeToNextITV.days < 1) {
            return (
                <div className="flex flex-col p-1 pl-3 mb-5 rounded-md bg-red-500">
                    <h2 className="text-gray-100 text-sm">PROXIMA ITV</h2>
                    <div className="flex justify-between">
                        <p>Hoy</p>
                        <TriangleAlert className="-mt-2.5 mr-15" />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex flex-col p-1 pl-3 mb-5 rounded-md bg-red-500">
                    <h2 className="text-gray-100 text-sm">PROXIMA ITV</h2>
                    <div className="flex justify-between">
                        <p>Hace {Math.abs(Math.floor(timeToNextITV.days))} {Math.abs(Math.floor(timeToNextITV.days)) <= 1 ? 'día' : 'días'}</p>
                        <TriangleAlert className="-mt-2.5 mr-15" />
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div className="flex flex-col p-1 pl-3 mb-5 rounded-md bg-red-500">
                <h2 className="text-gray-100 text-sm">PROXIMA ITV</h2>
                <div className="flex justify-between">
                    <p>Hace {Math.abs(Math.floor(timeToNextITV.months))} {Math.abs(Math.floor(timeToNextITV.months)) <= 1 ? 'mes' : 'meses'}</p>
                    <TriangleAlert className="-mt-2.5 mr-15" />
                </div>
            </div>
        )
    }
}

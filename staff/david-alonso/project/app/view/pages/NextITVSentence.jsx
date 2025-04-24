const nextITVDate = DateTime.fromISO(vehicle?.itv).plus({ year: 1 })
const timeToNextITV = nextITVDate.diff(DateTime.now().startOf('day'), ['months', 'days']).toObject()

let nextITVSentence = ''
if (timeToNextITV.months >= 1) {
    nextITVSentence =
        <div className={`p-1 pl-3 mb-5 rounded-md`} >
            <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
            <p>Dentro de {timeToNextITV.months} {Math.floor(timeToNextITV.months) <= 1 ? 'mes' : 'meses'}</p>
        </div>
} else if (timeToNextITV.months >= 0 && timeToNextITV.months < 1) {
    const showAlert = timeToNextITV.days < 7
    if (timeToNextITV.days >= 1) {
        nextITVSentence =
            <div className={`p-1 pl-3 mb-5 rounded-md ${showAlert ? "bg-red-500 " : "bg-amber-500 "}`} >
                <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
                <p>Dentro de {Math.floor(timeToNextITV.days)} {Math.floor(timeToNextITV.days) <= 1 ? 'día' : 'días'} {showAlert && '⚠️'}</p>
            </div>


    } else if (timeToNextITV.days >= 0 && timeToNextITV.days < 1) {
        nextITVSentence =
            <div className={`p-1 pl-3 mb-5 rounded-md bg-red-500 `} >
                <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
                <p>Hoy {showAlert && '⚠️'}</p>
            </div>

    } else {
        nextITVSentence =
            <div className={`p-1 pl-3 mb-5 rounded-md bg-red-500`} >
                <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
                <p>Hace {Math.abs(Math.floor(timeToNextITV.days))} {Math.abs(Math.floor(timeToNextITV.days)) <= 1 ? 'día' : 'días'} ⚠️</p>
            </div>

    }
} else {
    nextITVSentence =
        <div className={`p-1 pl-3 mb-5 rounded-md bg-red-500`} >
            <h2 className="text-gray-200 text-sm">PROXIMA ITV</h2>
            <p>Hace {Math.abs(Math.floor(timeToNextITV.months))} {Math.abs(Math.floor(timeToNextITV.months)) <= 1 ? 'mes' : 'meses'} ⚠️</p>
        </div>
}
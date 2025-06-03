import { data } from '../../data'
import { errors, validate } from 'com'

const { SystemError } = errors

export const retrieveMonthCalendarEvents = (year, monthIndex) => {
    validate.number(year, 1, 3000, 'year')
    validate.number(monthIndex, 0, 11, 'monthIndex')

    const { token } = data

    const start = new Date(year, monthIndex, 1)
    start.setHours(0, 0, 0, 0)

    const end = new Date(year, monthIndex + 1, 0)
    end.setHours(23, 59, 59, 999)

    const params = new URLSearchParams({
        startDate: start.toISOString(),
        endDate: end.toISOString()
    })

    return fetch(`${import.meta.env.VITE_API_URL}/couples/events?${params}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200) return response.json()
                .catch(error => {
                    throw new SystemError(error.message)
                })

            return response.json().then(body => {
                const { error, message } = body

                const constructor = errors[error]

                throw new constructor(message)
            })
        })
}

import { DateTime } from 'luxon'
import { TriangleAlert } from "lucide-react"
import { motion } from "framer-motion"

export function ITVAlert({ itvDate }) {
    if (!itvDate) return null

    const nextITVDate = DateTime.fromISO(itvDate).plus({ year: 1 })
    const timeToNextITV = nextITVDate.diff(DateTime.now().startOf('day'), ['days']).toObject()

    if (timeToNextITV.days > 30) {
        return null
    }

    const isCritical = timeToNextITV.days <= 7

    return (

        <TriangleAlert
            size={35}
            color={isCritical ? "red" : "orange"}
            className="-mt-6 mr-6"
        />

    )
}

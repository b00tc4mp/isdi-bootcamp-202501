import { eachDayOfInterval, parseISO } from 'date-fns'
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/dist/style.css'


export function RoutineCalendar({ startDate, endDate }) {
    let from, to;
    const defaultClassNames = getDefaultClassNames();

    if (startDate && endDate) {
        from = parseISO(startDate);
        to = parseISO(endDate);
    }

    return (
        <div>
            <DayPicker
                classNames={{
                    root: `${defaultClassNames.root}`,
                    day: `${defaultClassNames.day} pointer-events-none`,
                    navButton: `${defaultClassNames.navButton} cursor-pointer`,
                    caption: `${defaultClassNames.caption} text-center`,
                    range_start: `${defaultClassNames.range_start} bg-amber-500 border-amber-500 `,
                    range_end: `${defaultClassNames.range_end} bg-amber-500 border-amber-500 `,
                    range_middle: `${defaultClassNames.range_middle} bg-amber-300 border-amber-300 `,
                }}
                mode="range"
                selected={{ from, to }}
                disabled={{ before: from, after: to }}
                showOutsideDays
                ISOWeek
                footer={`From ${from.toLocaleDateString()} to ${to.toLocaleDateString()}`}
            />
        </div>
    )
}
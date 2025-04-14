import { useState, useEffect } from 'react'

import { logic } from '../../logic'

export function FunctionSelect({onCalendarClick, onListsClick, onDiaryClick, onFeelingsClick }) {
    const [user, setUser] = useState(null)
    const [daysTogether, setDaysTogether] = useState(0)
    const [partnerName, setPartnerName] = useState('')
    
    useEffect(() => {
        try {
            logic.getCurrentUser()
                .then(user => setUser(user))
                .catch(error => {
                    console.error(error)
    
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
    
            alert(error.message)
        }
    }, [])

    useEffect(() => {
        try {
            logic.getCoupleInfo()
                .then(status => {
                    const { partnerName, daysInRelationship } = status
                    setDaysTogether(daysInRelationship)
                    setPartnerName(partnerName)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
    
            alert(error.message)
        }
    }, [])

    const handleCalendarClick = () => onCalendarClick()

    const handleListsClick = () => onListsClick()
    
    const handleDiaryClick = () => onDiaryClick()
    
    const handleFeelingsClick = () => onFeelingsClick()

    return <>
        <h2>Welcome again, {user ? user.username : ''}</h2>
        <div>
            <img src="../assets/asset_handing_hearts.png" alt="Handing hearts" />
            <p>It’s been {daysTogether} days since {partnerName} and you met</p>
        </div>
        <div>
            <a onClick={handleCalendarClick}>
                <img src="../../assets/asset_calendar.png" alt="Calendar" />
                <span>CALENDAR</span>
            </a>
            <a onClick={handleListsClick}>
                <img src="../../assets/asset_list.png" alt="Lists" />
                <span>LISTS</span>
            </a>
            <a onClick={handleDiaryClick}>
                <img src="../../assets/asset_diary.png" alt="Diary" />
                <span>DIARY</span>
            </a>
            <a onClick={handleFeelingsClick}>
                <img src="../../assets/asset_feelings.png" alt="Feelings" />
                <span>FEELINGS</span>
            </a>
        </div>
    </>
}
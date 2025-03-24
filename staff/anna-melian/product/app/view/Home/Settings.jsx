/*

import { useState, useEffect } from 'react'

import { logic } from '../../logic/index.js'


export function Settings({ onDeleteProfileClick, onSubmitChanges }) {
    const [showPassword, setShowPassword] = useState(false)
    const [userInfo, setUserInfo] = useState('')


    useEffect(() => {
        try {
            logic.getUserInfo()
                .then(userInfo => setUserInfo(userInfo))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {

        }
    }, [])


    const handleDeleteProfileClick = () => {
        const confirmation = confirm('This action is permanent, do you want to continue?')
        if (confirmation) {
            logic.deleteProfile()
            onDeleteProfileClick()
        } else {
            alert('Cancelled')
        }

    }

    const handleUpdateProfileSubmit = event => {
        event.preventDefault()
        try {
            const { target: form } = event
            const {
                name: { value: name },
                username: { value: username },
                email: { value: email },

            } = form

            logic.updateUserProfile(name, username, email)
                .then(value => {
                    if (value === true)
                        alert('Profile successfully updated 🧙‍♀️')
                    if (value == false)
                        alert('No modifications')

                    onSubmitChanges()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleChangePasswordSubmit = event => {
        event.preventDefault()
        try {

            const { target: form } = event
            const {
                actualPassword: { value: actualPassword },
                newPassword: { value: newPassword },

            } = form

            logic.changePassword(actualPassword, newPassword)
                .then(() => {
                    alert('Password successfully changed 🧙‍♀️')
                    onSubmitChanges()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }


    return <section className="options">
        <h2>Settings</h2>
        <h4>Change personal information</h4>
        <form onSubmit={handleUpdateProfileSubmit}>
            <label htmlFor="text">Name</label>
            <input id='name' type="text" defaultValue={userInfo.name} />

            <label htmlFor="text">Username</label>
            <input id='username' type="text" defaultValue={userInfo.username} />

            <label htmlFor="text">E-mail</label>
            <input id='email' type="email" defaultValue={userInfo.email} />

            <button type="submit">Update profile</button>
        </form>
        <h4>Change your password</h4>
        <form onSubmit={handleChangePasswordSubmit}>
            <label htmlFor="text">Actual password</label>
            <input type={showPassword ? 'text' : 'password'} id="actualPassword" />

            <label htmlFor="text">New password</label>

            <input type={showPassword ? 'text' : 'password'} id="newPassword" />
            <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? '🙈' : '👁️'}
            </button>
            <button type="submit">Change password</button>

        </form>
        <h4>Delete your acount</h4>
        <button onClick={handleDeleteProfileClick}>Delete Profile</button>
    </section>
}

*/

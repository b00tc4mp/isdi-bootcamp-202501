import { useState, useEffect } from "react";
import { useContext } from '../../context';
import { logic } from '../../logic'

export function Home() {
    const { alert } = useContext()
    const [username, setUsername] = useState('')

    useEffect(() => {
        console.debug('Home -> useEfect')

        try {
            logic.getUserUsername()
                .then(username => setUsername(username))
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }, [])

    console.debug('Home -> render')

    return (
        <div>
            <header className="flex justify-between items-center fixed top-0 w-full bg-[var(--secondary-color)] py-[var(--padding-y)] px-[var(--padding-x)] box-border">
                <h1 className="text-2xl">Logo</h1>
                <h2>{username}</h2> {/* Solo mostramos el nombre de usuario */}
            </header>
        </div>
    )


}



import { useSearchParams }  from 'react-router'
import { useNavigate } from 'react-router'
import { logic } from '../../logic'

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate()

    const handleSearch = event => {
        event.preventDefault()

        const form = event.target

        const query = form.query.value

        if(!query.trim()) {
            alert.error('Search query cannot be empty')
            return
        }

        setSearchParams({q: query})

        try {
            const userId = logic.getUserId()
            navigate(`/${query}`, { state: { userId }})
            
        } catch(error) {
            console.error(error)
            alert(error.message)
        }
    }

    return <>
        <h1>Search</h1>

        <form onSubmit={handleSearch}>
            <input type="text" name="query" id="query" defaultValue={searchParams.get('q')} />
            <button type="submit">Search</button>
        </form>
    </>
}
import { useEffect } from "react"
import { useSearchParams } from 'react-router'

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get('q')

    useEffect(() => {
        const query = searchParams.get('q')

        console.log('TODO call logic searchUsers with query', query)
    }, [searchParams])

    const handleSearch = event => {
        event.preventDefault()

        const form = event.target

        const query = form.query.value

        setSearchParams({ q: query })
    }

    return <>
        <div>
            <h1>Search</h1>

            <form onSubmit={handleSearch} className='form-text'>
                <input type="text" name="query" id="query" defaultValue={query} className="input2" />

                <button type="submit">Search</button>
            </form>
        </div>

    </>
}
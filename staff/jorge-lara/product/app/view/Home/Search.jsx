import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q');

    useEffect(() => {
        const query = searchParams.get('q');
    }, [searchParams])

    const handleSearch = event => {
        event.preventDefault();

        const form = event.target;

        const query = form.query.value;

        setSearchParams({ q: query });
    }

    return <>
        <h1>Search</h1>

        <form onSubmit={handleSearch}>
            <input className='flex flex-col w-full mb-[1rem] border border-white' type='text' name='query' id='query' placeholder='Search' defaultValue={query} />
            <button type='submit'>Search</button>
        </form>
    </>
}
fetch('https://api.jikan.moe/v4/anime?q=legend', { method: 'POST' })
    .catch(error => { throw new Error('connection error') })
    .then(response => {
        const { status } = response

        if (status === 200)
            return response.json()
                .catch(error => { throw new Error('failed to parse json response') })

        throw new Error('status not 200 but ' + status)
    })
    .then(body => {
        const { data } = body

        console.table(data)
    })
    .catch(error => console.error(error))
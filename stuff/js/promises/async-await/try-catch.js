// fetch('https://api.jikan.moe/v4/anime?q=legend', { method: 'GET' })
//     .catch(error => { throw new Error('connection error') })
//     .then(response => {
//         const { status } = response

//         if (status === 200)
//             return response.json()
//                 .catch(error => { throw new Error('failed to parse json response') })

//         throw new Error('status not 200 but ' + status)
//     })
//     .then(body => {
//         const { data } = body

//         //console.table(data)
//         console.log(data)
//     })
//     .catch(error => console.error(error))


// same as:

; (async () => {
    try {
        let response

        try {
            response = await fetch('https://api.jikan.moe/v4/anime?q=legend', { method: 'GET' })
        } catch (error) {
            throw new Error('connection error')
        }

        const { status } = response

        if (status === 200) {
            let body

            try {
                body = await response.json()
            } catch (error) {
                throw new Error('failed to parse json response')
            }

            const { data } = body

            //console.table(data)
            console.log(data)

        } else throw new Error('status not 200 but ' + status)
    } catch (error) {
        console.error(error)
    }
})()
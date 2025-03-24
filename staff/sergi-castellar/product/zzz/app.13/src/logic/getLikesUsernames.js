// const fetchOne = (likeId) => {
//     return fetch(`http://localhost:8080/users/user/${likeId}`, {
//         method: 'GET'
//     })
//         .catch(error => { throw new Error(error.message) })
//         .then(response => {
//             if (response.status === 200)
//                 return response.json()
//                     .then(body => {
//                         const { user } = body
//                         if (user && user.username) {
//                             return user.username
//                         } else {
//                             throw new Error('User data cannot be retrieved')
//                         }
//                     })
//             else {
//                 return response.json()
//                     .then(body => {
//                         const { error, message } = body
//                         throw new Error(message)
//                     })
//             }
//         })
// }

// export const getLikesUsernames = (likeIds) => {
//     let promises = likeIds.map(likeId => fetchOne(likeId));

//     return Promise.all(promises) // Espera que todas las promesas se resuelvan
//         .catch(error => {
//             throw new Error(error.message);
//         });
// };





// export const getLikesUsernames = (likeIds) => {
//     let likeUsernames = []
//     for (let i = 0; i < likeIds.length; i++) {
//         const likeId = likeIds[i]
//         fetch(`http://localhost:8080/users/user/${likeId}`, {
//             method: 'GET'
//         })
//             .then(response => {
//                 if (response.status === 200)
//                     return response.json()
//             })
//             .then(body => {
//                 console.log('clog from getlikesusernames, body :>> ', body);
//                 const { user } = body
//                 likeUsernames.push(user.username)
//             })
//             .catch(error => { throw new Error(error.message) })
//         //.catch()
//     }
//     return likeUsernames
// }


export const getLikesUsernames = (likeIds) => {
    const arrayCosas = []
    return Promise.all(likeIds.map(likeId => {
        return fetch(`http://localhost:8080/users/user/${likeId}`, {
            method: 'GET'
        })
            .catch(error => { throw new Error(error.message) })
            .then(response => {
                console.log(response.status)
                console.log('clog from getlikesusernames, response :>> ', response);
                if (response.status === 200)
                    return response.json()
                        .catch(error => { throw new Error(error.message) })
                        .then(body => {
                            console.log('clog from getlikesusernames, body :>> ', body);
                            const { user } = body

                            console.log('user from bdy from app', user)
                            if (user && user.username) {
                                console.log('username dentro del if', user.username)
                                return user.username
                            } else
                                throw new Error('user data cannot be retrieved')
                        })
                return response.json()
                    .catch(error => { throw new Error(error.message) })
                    .then(body => {
                        const { error, message } = body

                        throw new Error(message)
                    })

            })
            .catch(error => { throw new Error(error.message) })
            .then(response => console.log('response de promise all', response))
    })
    )
}
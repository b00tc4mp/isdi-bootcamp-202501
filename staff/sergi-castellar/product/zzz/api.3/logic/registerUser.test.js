import { data } from "../data/index.js";
import { registerUser } from "./registerUser.js"
//tested
console.info('TEST registerUser')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let response2 = null

            return registerUser("prueba", "prue@ba.com", "prueba", "123456")
                .then(response => response2 = response)
                .finally(() => {
                    console.assert(response2 === undefined), 'response is undefined'
                    console.log('response :>> ', response2)
                })
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
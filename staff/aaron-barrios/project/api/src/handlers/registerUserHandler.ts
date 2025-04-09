// import { Response } from 'express'
// import { CustomRequestBody, UserFromRequest } from '../types.js'
// import service from '../services/user/index.js'
// import createFunctionalHandler from '../middlewares/createFunctionalHandler.js'

// const registerUserHandler = createFunctionalHandler<UserFromRequest>(
//     (req: CustomRequestBody<UserFromRequest>, res: Response) => {
//         const { name, lastName, email, alias, password, level } = req.body

//         return service.registerUser(name, lastName, email, alias, password, level)
//             .then(() => {
//                 res.status(201).send()
//             })
//     }
// )

// export default registerUserHandler
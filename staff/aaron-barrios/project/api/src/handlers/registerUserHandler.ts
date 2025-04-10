// const registerUserHandler = createFunctionalHandler<UserFromRequest>(
//     (req, res: Response) => {
//         const { name, lastName, alias, email, password } = (req as CustomRequestBody<UserFromRequest>).body;

//         return service.registerUser(name, lastName, alias, email, password).then(() => {
//             res.status(201).send();
//         });
//     }
// );

// export default registerUserHandler

const registerUserHandler = () => {

}

export default registerUserHandler
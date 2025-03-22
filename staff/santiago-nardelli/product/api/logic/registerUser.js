import { data } from "../data/index.js";
import { validate, errors } from "com";

const { DuplicityError, SystemError } = errors;
export const registerUser = (name, email, password) => {
  validate.text(name, "name");
  validate.maxLength(name, 20, "name");
  validate.email(email, "email");
  validate.password(password, "password");

  return data.users
    .findeOne({ $or: [{ name }, { email }] })
    .catch(() => {
      throw new SystemError("Error connecting to database");
    })
    .then((user) => {
      if (user) throw new DuplicityError("user already exists");
      const user = {
        name: name,
        email: email,
        password: password,
        createdAt: new Date(),
        status: "active",
        role: "user",
        modifiedAt: null,
      };
      return data.users.insertOne(user).catch(() => {
        if (error.code === 11000)
          throw new DuplicityError("user already exists");
        throw new SystemError(error.message);
      });
    })
    .then(() => {});
    
};

//cmd
// .\bin\mongod.exe --dbpath data


//powershell
// PS C:\Users\Usuario> cd Downloads
// PS C:\Users\Usuario\Downloads> cd .\mongosh-2.4.2-win32-x64\
// PS C:\Users\Usuario\Downloads\mongosh-2.4.2-win32-x64> bin\mongosh



//en la terminal desde mi api ejecuto el comando
//node logic/registerUser.test.js ==> para ejecutar el test


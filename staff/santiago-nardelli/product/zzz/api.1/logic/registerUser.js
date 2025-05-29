import {data} from '../data/index.js';
import {validate, errors} from 'com';

const {DuplicityError} = errors;
export const registerUser = (name, email, password) => {
  validate.text(name, "name");
  validate.maxLength(name, 20, "name");
  validate.email(email, "email");
  validate.password(password, "password");

  //meotodo de data para buscar un usuario
  const found = data.users.findOne(
    (user) => user.email === email || user.name === name
  );

  if (found) throw new DuplicityError("user already exists");

  const user = {
    name: name,
    email: email,
    password: password,
    createdAt: new Date(),
    status: "active",
    role: "user",
    modifiedAt: null,
  };
  //metodo de data para insertar un usuario
  data.users.insertOne(user);
};

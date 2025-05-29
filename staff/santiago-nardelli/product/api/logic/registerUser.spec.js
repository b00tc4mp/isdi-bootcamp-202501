import "dotenv/config";

import { data, User } from '../data/index.js';

import { registerUser } from './registerUser.js';

import { expect } from "chai"; //==> Libreria de aserciones que se utiliza para realizar las pruebas unitarias

import bcrypt from "bcryptjs"; //==> Libreria que se utiliza para encriptar las contraseñas de los usuarios
import {errors} from 'com'

const {URL_MONGO, DB_NAME} = process.env; //==> Variables de entorno que se utilizan en el proyecto para configurar la API
const{ DuplicityError} = errors //==> Importo el error de duplicidad que se lanza cuando se intenta registrar un usuario que ya existe en la base de datos
describe("registerUser", () => {
  before(() => data.connect(URL_MONGO, DB_NAME)); //==> Conecto a la base de datos

  beforeEach(() => User.deleteMany({}));

  it("succeeds on new user", () => {
    let result2;

    return registerUser("Cuti Romero", "cuti@romero.com", "123123123")
      .then((result) => (result2 = result))

      .finally(() => expect(result2).to.be.undefined)

      .then(() => User.findOne({ email: "cuti@romero.com" }).lean())

      .then((user) => {
        expect(user.name).to.equal("Cuti Romero");

        expect(user.email).to.equal("cuti@romero.com");

        //expect(user.username).to.equal("eugeni");

        return bcrypt.compare("123123123", user.password);
      })

      .then((match) => expect(match).to.be.true);
  });

  it("fails on existing user", () => {
    let catchedError;

    return User.create({
      name: "Cuti Romero",

      email: "cuti@romero.com",

      //username: "eugeni",

      password: "$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO",
    })

      .then(() => registerUser("Cuti Romero", "cuti@romero.com", "123123123"))

      .catch((error) => (catchedError = error))

      .finally(() => {
        expect(catchedError).to.be.instanceOf(DuplicityError);

        expect(catchedError.message).to.equal("user already exists");
      });
  });

  afterEach(() => User.deleteMany({}));

  after(() => data.disconnect());
});

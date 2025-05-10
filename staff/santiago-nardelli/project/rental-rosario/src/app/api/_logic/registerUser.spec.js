import "dotenv/config";
import { User } from "../../../lib/db/models/index.js";
import { validate, errors } from "com";
import { registerUser } from "./registerUser.js";
import bcrypt from "bcryptjs";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../lib/db/index.js";
import { expect } from "chai";

const { DuplicityError, SystemError, ValidateError } = errors;
const { DATABASE_URL, DATABASE_NAME } = process.env;

console.info("DATABASE_URL", DATABASE_URL);
console.info("DATABASE_NAME", DATABASE_NAME);

// `describe` es una función de Mocha que agrupa las pruebas relacionadas.
// Aquí, estamos describiendo las pruebas para la funcionalidad `registerUser`.
describe("TEST registerUser", () => {
  // `before` es un hook de Mocha que se ejecuta una sola vez antes de todas las pruebas en este bloque `describe`.
  // Aquí, lo usamos para conectar a la base de datos.
  before(async () => {
    await connectToDatabase(DATABASE_URL, DATABASE_NAME);
    console.info("Connected to database");
  });

  // `beforeEach` es un hook de Mocha que se ejecuta antes de cada prueba (`it`) dentro de este bloque `describe`.
  // Aquí, lo usamos para limpiar la colección de usuarios, asegurando un estado limpio para cada prueba.
  beforeEach(async () => {
    await User.deleteMany({});
    console.info("Users collection cleared");
  });

  // `it` es una función de Mocha que define una prueba individual.
  // Esta prueba verifica el escenario de registro exitoso de un nuevo usuario.
  it("should register a new user", async () => {
    // Datos de prueba para un nuevo usuario.
    const name = "Lio Messi";
    const email = "lio@messi.com";
    const password = "123123123";

    // Llamamos a la función `registerUser` con los datos de prueba y esperamos a que se complete.
    const result = await registerUser(name, email, password);

    // Aserción de Chai: Verificamos que la función `registerUser` no devuelva ningún valor (undefined) en caso de éxito.
    expect(result).to.be.undefined;

    // Buscamos al usuario en la base de datos utilizando el email con el que se registró.
    const user = await User.findOne({ email }).lean();

    // Aserción de Chai: Verificamos que el usuario haya sido creado y exista en la base de datos.
    expect(user).to.exist;

    // Aserciones de Chai: Verificamos que los datos del usuario guardado coincidan con los datos de prueba.
    expect(user).to.be.an("object");
    expect(user.name).to.equal(name);
    expect(user.email).to.equal(email);

    // Aserción de Chai: Verificamos que la contraseña guardada esté hasheada correctamente comparándola con la contraseña original.
    const match = await bcrypt.compare(password, user.password);
    expect(match).to.be.true;
  });

  it("fails in existing user", async () => {
    // Datos de prueba para un nuevo usuario.
    const name = "Lio Messi";
    const email = "lio@messi.com";
    const password = "123123123";

    User.create({ name, email, password: await bcrypt.hash(password, 10) })
      .then(() => {
        // Llamamos a la función `registerUser` con los datos de prueba y esperamos a que se complete.
        return registerUser(name, email, password);
      })
      .catch((error) => {
        // Aserción de Chai: Verificamos que el error sea una instancia de `DuplicityError`.
        expect(error).to.be.instanceOf(DuplicityError);
        expect(error.message).to.equal("User already exists");
      });
  });
  // `afterEach` es un hook de Mocha que se ejecuta después de cada prueba (`it`) dentro de este bloque `describe`.
  // Aquí, lo usamos para limpiar la colección de usuarios después de cada prueba.
  afterEach(async () => {
    await User.deleteMany({});
    console.info("Users collection cleared after test");
  });

  // `after` es un hook de Mocha que se ejecuta una sola vez después de todas las pruebas en este bloque `describe`.
  // Aquí, lo usamos para desconectar de la base de datos.
  after(async () => {
    await disconnectFromDatabase();
    console.info("Disconnected from database");
  });
});

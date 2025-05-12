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

describe("TEST registerUser", () => {
  before(async () => {
    try {
      await connectToDatabase(DATABASE_URL, DATABASE_NAME);
      console.info("Connected to database");
    } catch (error) {
      console.error("Failed to connect to the database:", error);
      throw error; // Detén las pruebas si no se puede conectar
    }
  });

  beforeEach(async () => {
    try {
      await User.deleteMany({});
      console.info("Users collection cleared");
    } catch (error) {
      console.error("Failed to clear Users collection:", error);
      throw error; // Detén las pruebas si la colección no se puede limpiar
    }
  });

  it("should register a new user", async () => {
    const name = "Lio Messi";
    const email = "lio@messi.com";
    const password = "123123123";

    // Registrar un nuevo usuario
    await registerUser(name, email, password);

    // Verificar que el usuario existe en la base de datos
    const user = await User.findOne({ email }).lean();
    expect(user).to.exist;
    expect(user.name).to.equal(name);
    expect(user.email).to.equal(email);

    // Verificar que la contraseña esté correctamente hasheada
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    expect(isPasswordMatch).to.be.true;
  });

  it("fails in existing user", async () => {
    const name = "Lio Messi";
    const email = "lio@messi.com";
    const password = "123123123";

    // Crear usuario manualmente
    await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    // Intentar registrar el mismo usuario y esperar un error
    let caughtError;
    try {
      await registerUser(name, email, password);
    } catch (error) {
      caughtError = error;
    }

    expect(caughtError).to.be.instanceOf(DuplicityError);
    expect(caughtError.message).to.equal("User already exists");
  });

  afterEach(async () => {
    try {
      await User.deleteMany({});
      console.info("Users collection cleared after test");
    } catch (error) {
      console.error("Failed to clear Users collection after test:", error);
    }
  });

  after(async () => {
    try {
      await disconnectFromDatabase();
      console.info("Disconnected from database");
    } catch (error) {
      console.error("Failed to disconnect from the database:", error);
      throw error; // Detén cualquier otro proceso si no puedes desconectar
    }
  });
});

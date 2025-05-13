import "dotenv/config";
import { User } from "../../../lib/db/models/index.js";
import { errors } from "com";
import { authenticateUser } from "../_logic/index.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { expect } from "chai";

const { NotFoundError, CredentialsError } = errors;
const { DATABASE_URL, DATABASE_NAME } = process.env;

describe("Authorization after successful authentication", () => {
  before(async () => {
    try {
      await mongoose.connect(DATABASE_URL, {
        dbName: DATABASE_NAME,
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.info("Connected to database");
    } catch (error) {
      console.error("Error connecting to database:", error);
      throw error;
    }
  });

  beforeEach(async () => {
    await User.deleteMany({});
    console.info("Users collection cleared");
  });

  it("should return user id and role upon successful authentication", async () => {
    const plainPassword = "securePassword";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newUser = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      role: "admin", // Definimos un rol para la prueba de autorización
    });

    const authResult = await authenticateUser(
      "test@example.com",
      plainPassword
    );

    expect(authResult).to.be.an("object");
    expect(authResult).to.have.property("id").that.is.a("string");
    expect(authResult).to.have.property("role").that.equals("admin");
  });

  it("should return user id and role for a user with a different role", async () => {
    const plainPassword = "userPassword";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newUser = await User.create({
      name: "Regular User",
      email: "user@example.com",
      password: hashedPassword,
      role: "user", // Definimos un rol diferente
    });

    const authResult = await authenticateUser(
      "user@example.com",
      plainPassword
    );

    expect(authResult).to.be.an("object");
    expect(authResult).to.have.property("id").that.is.a("string");
    expect(authResult).to.have.property("role").that.equals("user");
  });

  it("should throw NotFoundError if user does not exist", async () => {
    const nonExistentEmail = "email@email.com";

    const password = "password123";

    try {
      await authenticateUser(nonExistentEmail, password);
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.equal("User not found");
    }
  });

  it("should throw CredentialsError if password is incorrect", async () => {
    const plainPassword = "securePassword";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const testEmail = "user@example.com"; // Definimos el email del usuario creado
    const incorrectPassword = "wrongPassword"; // Definimos una contraseña incorrecta

    const newUser = await User.create({
      name: "Regular User",
      email: testEmail,
      password: hashedPassword,
      role: "user", // Definimos un rol diferente
    });

    try {
      await authenticateUser(testEmail, incorrectPassword);
    } catch (error) {
      expect(error).to.be.instanceOf(CredentialsError);
      expect(error.message).to.equal("Invalid credentials");
    }
  });

  afterEach(async () => {
    await User.deleteMany({});
    console.info("Users collection cleared after test");
  });
  after(async () => {
    try {
      await mongoose.connection.dropDatabase();
      await mongoose.disconnect();
      console.info("Disconnected from database");
    } catch (error) {
      console.error("Error disconnecting from database:", error);
      throw error;
    }
  });
});

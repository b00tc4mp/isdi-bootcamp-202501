import "dotenv/config";
import { User } from "../../../lib/db/models/index.js";
import { errors, validate } from "com";
import { registerUser } from "../_logic/registerUser.js";
import mongoose from "mongoose";
import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcryptjs";

const { DuplicityError, SystemError, ValidateError } = errors;
const { DATABASE_URL, DATABASE_NAME } = process.env;

describe("registerUser", () => {
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
    console.info("Users collection cleared for registerUser test");
  });

  it("should successfully register a new user", async () => {
    const userData = {
      name: "Juan Perez",
      email: "juan@example.com",
      password: "password123",
    };

    await registerUser(userData.name, userData.email, userData.password);

    // Verificar que el usuario fue registrado correctamente
    const userInDb = await User.findOne({ email: userData.email }).lean();
    expect(userInDb).to.exist;
    expect(userInDb.email).to.equal(userData.email);
    expect(userInDb.name).to.equal(userData.name);
    expect(userInDb.password).to.not.equal(userData.password); // Verificar que la contraseña esté cifrada
    expect(userInDb.password).to.not.equal(userData.password);
  });

  it("should throw ValidateError if name is too long", () => {
    const invalidUserData = {
      name: "A".repeat(21), // Nombre con más de 20 caracteres
      email: "juan@example.com",
      password: "password123",
    };

    expect(() => {
      validate.text(invalidUserData.name, { maxLength: 20 }, "name");
    })
      .to.throw(ValidateError)
      .with.property("message")
      .that.includes("Invalid name (maximum length 20)");
  });

  it("should throw ValidateError if name is too short", () => {
    const invalidUserData = {
      name: "",
      email: "juan@example.com",
      password: "password123",
    };

    expect(() => {
      validate.text(invalidUserData.name, { minLength: 1 }, "name");
    })
      .to.throw(ValidateError)
      .with.property("message")
      .that.includes("Invalid name");
  });

  it("should throw ValidateError if email is invalid", () => {
    const invalidUserData = {
      name: "Juan Perez",
      email: "invalid-email",
      password: "password123",
    };

    expect(() => {
      validate.email(invalidUserData.email, "email");
    })
      .to.throw(ValidateError)
      .with.property("message")
      .that.includes("Invalid email");
  });

  it("should throw ValidateError if password is too short", () => {
    const invalidUserData = {
      name: "Juan Perez",
      email: "juan@example.com",
      password: "123", // Contraseña demasiado corta
    };

    expect(() => {
      validate.password(invalidUserData.password, { minLength: 6 }, "password");
    })
      .to.throw(ValidateError)
      .with.property("message")
      .that.includes("Invalid text (minimum length 6)");
  });

  it("should throw ValidateError if password is too long", () => {
    const invalidUserData = {
      name: "Juan Perez",
      email: "juan@example.com",
      password: "A".repeat(51), // Contraseña con más de 50 caracteres
    };

    expect(() => {
      validate.password(
        invalidUserData.password,
        { maxLength: 50 },
        "password"
      );
    })
      .to.throw(ValidateError)
      .with.property("message")
      .that.includes("Invalid text (maximum length 50)");
  });

  it("should throw DuplicityError if the user already exists", async () => {
    const existingUserData = {
      name: "Juan Perez",
      email: "juan@example.com",
      password: "password123",
    };

    const existingUser = new User(existingUserData);
    await existingUser.save();

    try {
      await registerUser(
        existingUserData.name,
        existingUserData.email,
        existingUserData.password
      );
      throw new Error("Expected DuplicityError, but got no error");
    } catch (error) {
      expect(error).to.be.an.instanceOf(DuplicityError);
      expect(error.message).to.include("User already exists");
    }
  });

  it("should throw SystemError if there is an error checking for duplicate users", async () => {
    const userData = {
      name: "Juan Perez",
      email: "juan@example.com",
      password: "password123",
    };

    const stub = sinon
      .stub(User, "findOne")
      .throws(new Error("Database query failed"));

    try {
      await registerUser(userData.name, userData.email, userData.password);
      throw new Error("Expected SystemError, but got no error");
    } catch (error) {
      expect(error).to.be.an.instanceOf(SystemError);
      expect(error.message).to.include("Database query failed");
    }

    stub.restore();
  });

  it("should throw SystemError if there is an error during password hashing", async () => {
    const userData = {
      name: "Juan Perez",
      email: "juan@example.com",
      password: "password123",
    };

    const stub = sinon
      .stub(bcrypt, "hash")
      .throws(new Error("Password hashing failed"));

    try {
      await registerUser(userData.name, userData.email, userData.password);
      throw new Error("Expected SystemError, but got no error");
    } catch (error) {
      expect(error).to.be.an.instanceOf(SystemError);
      expect(error.message).to.include("Password hashing failed");
    }

    stub.restore();
  });

  it("should throw a validation error if the email is invalid", () => {
    const invalidUserData = {
      name: "Juan Perez",
      email: "invalid-email",
      password: "password123",
    };

    expect(() => {
      registerUser(
        invalidUserData.name,
        invalidUserData.email,
        invalidUserData.password
      );
    }).to.throw("Invalid email");
  });

  it("should throw a validation error if the password is invalid", () => {
    const invalidUserData = {
      name: "Juan Perez",
      email: "juan@example.com",
      password: "123", // Contraseña demasiado corta
    };

    expect(() => {
      registerUser(
        invalidUserData.name,
        invalidUserData.email,
        invalidUserData.password
      );
    }).to.throw("Invalid password");
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

import "dotenv/config";
import { expect } from "chai";
import { updateProperty } from "./updateProperties.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../lib/db/index.js";
import { Property, User } from "../../../lib/db/models/index.js";
import { errors } from "com";
import { Types } from "mongoose";

const { ObjectId } = Types;
const { NotFoundError, SystemError, ValidateError } = errors;
const { DATABASE_URL, DATABASE_NAME } = process.env;

describe("TEST updateProperty (manual updatedAt)", () => {
  before(async () => {
    try {
      await connectToDatabase(DATABASE_URL, DATABASE_NAME);
      console.info("Connected to database for updateProperty tests");
    } catch (error) {
      console.error("Failed to connect to the database:", error);
      throw error; // Detiene las pruebas si no hay conexión
    }
  });

  let testUser;
  let testProperty;

  beforeEach(async () => {
    try {
      await Property.deleteMany({});
      await User.deleteMany({});
      console.info("Cleared test data");

      testUser = new User({
        name: "Test User",
        email: "test@example.com",
        password: "password",
      });
      await testUser.save();

      testProperty = new Property({
        userId: testUser._id,
        title: "Original Title",
        description: "Original Description",
        location: "Original Location",
        price: 100,
        type: "house",
        bedrooms: 2,
        images: ["original.jpg"],
        airbnbUrl: "https://original.com",
      });
      await testProperty.save();
      console.info("Test user and property created");
    } catch (error) {
      console.error("Error setting up test data:", error);
      throw error; // Detiene las pruebas si no se pueden configurar los datos
    }
  });

  it("should successfully update a property with valid updates and return the updated property with a non-null updatedAt", async () => {
    const updates = { title: "Updated Title", price: 150 };
    const updatedProperty = await updateProperty(
      testUser._id.toString(),
      testProperty._id.toString(),
      updates
    );
    expect(updatedProperty).to.exist;
    expect(updatedProperty.title).to.equal("Updated Title");
    expect(updatedProperty.price).to.equal(150);
    expect(updatedProperty.updatedAt).to.be.a("date");
    expect(updatedProperty.updatedAt).to.not.be.null;
  });

  it("should return the updated property with the new description and a non-null updatedAt", async () => {
    const updates = { description: "New Description" };
    const updatedProperty = await updateProperty(
      testUser._id.toString(),
      testProperty._id.toString(),
      updates
    );
    expect(updatedProperty).to.exist;
    expect(updatedProperty.description).to.equal("New Description");
    expect(updatedProperty.updatedAt).to.be.a("date");
    expect(updatedProperty.updatedAt).to.not.be.null;
  });

  it("should throw ValidateError for invalid title", async () => {
    const updates = { title: "ab" };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Should have thrown ValidateError");
    } catch (error) {
      expect(error).to.be.instanceOf(ValidateError);
      expect(error.message).to.equal("Invalid text (minimum length 3): ab");
    }
  });

  it("should throw ValidateError for invalid price", async () => {
    const updates = { price: -5 };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Should have thrown ValidateError");
    } catch (error) {
      expect(error).to.be.instanceOf(ValidateError);
      expect(error.message).to.equal("Invalid number (minimum 0): -5");
    }
  });

  it("should throw ValidateError for invalid type", async () => {
    const updates = { type: "mansion" };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Should have thrown ValidateError");
    } catch (error) {
      expect(error).to.be.instanceOf(ValidateError);
      expect(error.message).to.equal(
        "Invalid text (allowed values: house, apartment, studio): mansion"
      );
    }
  });

  it("should throw ValidateError for invalid images (not an array)", async () => {
    const updates = { images: "not an array" };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Should have thrown ValidateError");
    } catch (error) {
      expect(error).to.be.instanceOf(ValidateError);
      expect(error.message).to.equal("Images must be an array");
    }
  });

  it("should throw ValidateError for invalid image URL", async () => {
    const updates = { images: ["not a url"] };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Should have thrown ValidateError");
    } catch (error) {
      expect(error).to.be.instanceOf(ValidateError);
      expect(error.message).to.equal("Invalid URL in image URL: not a url");
    }
  });

  it("should only update provided valid fields and return the updated property with a non-null updatedAt", async () => {
    const updates = { title: "New Title", price: null, bedrooms: 4 };
    const updatedProperty = await updateProperty(
      testUser._id.toString(),
      testProperty._id.toString(),
      updates
    );
    expect(updatedProperty).to.exist;
    expect(updatedProperty.title).to.equal("New Title");
    expect(updatedProperty.price).to.equal(100);
    expect(updatedProperty.bedrooms).to.equal(4);
    expect(updatedProperty.updatedAt).to.be.a("date");
    expect(updatedProperty.updatedAt).to.not.be.null;
  });

  it("should handle updating only one valid field and return the updated property with a non-null updatedAt", async () => {
    const updates = { description: "A slightly different description." };
    const updatedProperty = await updateProperty(
      testUser._id.toString(),
      testProperty._id.toString(),
      updates
    );
    expect(updatedProperty).to.exist;
    expect(updatedProperty.description).to.equal(
      "A slightly different description."
    );
    expect(updatedProperty.title).to.equal("Original Title");
    expect(updatedProperty.updatedAt).to.be.a("date");
    expect(updatedProperty.updatedAt).to.not.be.null;
  });

  it("should NOT throw NotFoundError for a successful update", async () => {
    const updates = { title: "Updated Title" };
    await updateProperty(
      testUser._id.toString(),
      testProperty._id.toString(),
      updates
    );
    // Si la promesa se resuelve sin errores, el test pasa.
  });

  it("should throw ValidateError for a validation error (title)", async () => {
    const updates = { title: "ab" };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Should have thrown ValidateError");
    } catch (error) {
      expect(error).to.be.instanceOf(ValidateError);
      expect(error.message).to.equal("Invalid text (minimum length 3): ab");
    }
  });

  it("should throw SystemError if there's a database error during user lookup", async () => {
    const originalUserFindById = User.findById;
    User.findById = async () => {
      throw new Error("Simulated database error during user lookup"); // Simula un error de DB
    };
    const updates = { title: "Will Not Update" };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Should have thrown SystemError");
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      // No necesitamos verificar el mensaje exactamente, ya que dependerá del error real.
      // Si quieres ser más específico, simula un mensaje de error conocido de Mongoose.
      // expect(error.message).to.equal("Simulated database error during user lookup");
    } finally {
      User.findById = originalUserFindById;
    }
  });

  it("should throw SystemError if there's a database error during property update", async () => {
    const originalPropertyFindOneAndUpdate = Property.findOneAndUpdate;
    Property.findOneAndUpdate = async () => {
      throw new Error("Simulated database error during property update"); // Simula un error de DB
    };
    const updates = { title: "Will Not Update" };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Should have thrown SystemError");
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      // No necesitamos verificar el mensaje exactamente.
      // Si quieres ser más específico, simula un mensaje de error conocido de Mongoose.
      // expect(error.message).to.equal("Simulated database error during property update");
    } finally {
      Property.findOneAndUpdate = originalPropertyFindOneAndUpdate;
    }
  });
  afterEach(async () => {
    try {
      await Property.deleteMany({});
      await User.deleteMany({});
      console.info("Test data cleared");
    } catch (error) {
      console.error("Failed to clear test data after test:", error);
      // No detenemos las pruebas para asegurar que el flujo continúe.
    }
  });

  after(async () => {
    try {
      await disconnectFromDatabase();
      console.info("Disconnected from database after updateProperty tests");
    } catch (error) {
      console.error("Failed to disconnect from the database:", error);
      throw error; // Si no podemos desconectar, podría haber problemas graves.
    }
  });
});

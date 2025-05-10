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

connectToDatabase(DATABASE_URL, DATABASE_NAME);
describe("TEST updateProperty", () => {
  before(async () => {
    await connectToDatabase();
    console.info("Connected to database for updateProperty tests");
  });

  let testUser;
  let testProperty;

  beforeEach(async () => {
    await Property.deleteMany({});
    await User.deleteMany({});

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
  });

  afterEach(async () => {
    await Property.deleteMany({});
    await User.deleteMany({});
    console.info("Test data cleared");
  });

  after(async () => {
    await disconnectFromDatabase();
    console.info("Disconnected from database after updateProperty tests");
  });

  it("should successfully update a property with valid updates and NOT throw NotFoundError", async () => {
    const updates = { title: "Updated Title", price: 150 };
    try {
      const updatedProperty = await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect(updatedProperty).to.exist;
      expect(updatedProperty.title).to.equal("Updated Title");
      expect(updatedProperty.price).to.equal(150);
      expect(updatedProperty.modifiedAt).to.be.a("date");
    } catch (error) {
      expect.fail(
        `Test should not have thrown an error, but caught: ${error.message}`
      );
    }
  });

  it("should return the updated property and NOT throw NotFoundError", async () => {
    const updates = { description: "New Description" };
    try {
      const updatedProperty = await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect(updatedProperty).to.exist;
      expect(updatedProperty.description).to.equal("New Description");
    } catch (error) {
      expect.fail(
        `Test should not have thrown an error, but caught: ${error.message}`
      );
    }
  });

  it("should throw ValidateError for invalid title and NOT throw NotFoundError", async () => {
    const updates = { title: "ab" };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Test should have thrown a ValidateError");
    } catch (error) {
      expect(error).to.be.an.instanceOf(ValidateError);
      expect(error.message).to.equal("invalid text ab");
    }
  });

  it("should throw ValidateError for invalid price and NOT throw NotFoundError", async () => {
    const updates = { price: -5 };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Test should have thrown a ValidateError");
    } catch (error) {
      expect(error).to.be.an.instanceOf(ValidateError);
      expect(error.message).to.equal("invalid number -5");
    }
  });

  it("should throw ValidateError for invalid type and NOT throw NotFoundError", async () => {
    const updates = { type: "mansion" };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Test should have thrown a ValidateError");
    } catch (error) {
      expect(error).to.be.an.instanceOf(ValidateError);
      expect(error.message).to.equal("invalid text mansion");
    }
  });

  it("should throw ValidateError for invalid images (not an array) and NOT throw NotFoundError", async () => {
    const updates = { images: "not an array" };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Test should have thrown a ValidateError");
    } catch (error) {
      expect(error).to.be.an.instanceOf(ValidateError);
      expect(error.message).to.equal("Images must be an array");
    }
  });

  it("should throw ValidateError for invalid image URL and NOT throw NotFoundError", async () => {
    const updates = { images: ["not a url"] };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Test should have thrown a ValidateError");
    } catch (error) {
      expect(error).to.be.an.instanceOf(ValidateError);
      expect(error.message).to.equal("invalid image URL not a url");
    }
  });

  it("should only update provided valid fields and NOT throw NotFoundError", async () => {
    const updates = { title: "New Title", price: null, bedrooms: 4 };
    try {
      const updatedProperty = await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect(updatedProperty).to.exist;
      expect(updatedProperty.title).to.equal("New Title");
      expect(updatedProperty.price).to.equal(100);
      expect(updatedProperty.bedrooms).to.equal(4);
    } catch (error) {
      expect.fail(
        `Test should not have thrown an error, but caught: ${error.message}`
      );
    }
  });

  it("should handle updating only one valid field and NOT throw NotFoundError", async () => {
    const updates = { description: "A slightly different description." };
    try {
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
    } catch (error) {
      expect.fail(
        `Test should not have thrown an error, but caught: ${error.message}`
      );
    }
  });
  it("should NOT throw NotFoundError for a successful update", async () => {
    const updates = { title: "Updated Title" };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      // Si la promesa se resuelve sin error, la prueba pasa
    } catch (error) {
      // Si se lanza algún error, la prueba falla
      expect.fail(
        `Test should not have thrown an error, but caught: ${error.message}`
      );
    }
  });

  it("should NOT throw NotFoundError for a validation error", async () => {
    const updates = { title: "ab" };
    try {
      await updateProperty(
        testUser._id.toString(),
        testProperty._id.toString(),
        updates
      );
      expect.fail("Test should have thrown a ValidateError");
    } catch (error) {
      expect(error).to.be.an.instanceOf(ValidateError);
      // Puedes agregar más aserciones sobre el error de validación si es necesario
    }
  });
});

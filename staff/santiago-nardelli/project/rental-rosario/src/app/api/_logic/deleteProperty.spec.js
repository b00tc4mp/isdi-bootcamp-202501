import "dotenv/config";
import { expect } from "chai";
import { deleteProperty } from "./deleteProperty.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../lib/db/index.js";
import { Property } from "../../../lib/db/models/index.js";
import { errors } from "com";
import { Types } from "mongoose";

const { ObjectId } = Types;

const { NotFoundError } = errors;
const { DATABASE_URL, DATABASE_NAME } = process.env;

connectToDatabase(DATABASE_URL, DATABASE_NAME);
describe("TEST deleteProperty", () => {
  before(async () => {
    await connectToDatabase();
    console.info("Connected to database for deleteProperty tests");
  });

  beforeEach(async () => {
    await Property.deleteMany({});
    console.info("Properties collection cleared for deleteProperty test");
  });

  it("should successfully delete a property by its ID", async () => {
    const ownerId = new ObjectId();

    // Crear una propiedad de prueba
    const newProperty = new Property({
      userId: ownerId,
      title: "Test Property",
      description: "This is a test property.",
      location: "Test Location",
      images: ["image1.jpg", "image2.jpg"],
      bedrooms: 3,
      airbnbUrl: "https://airbnb.com/test-property",
      type: "apartment",
    });
    const savedProperty = await newProperty.save();
    const propertyIdToDelete = savedProperty._id.toString();

    // Llamar a la función deleteProperty con el userId
    const result = await deleteProperty(
      ownerId.toHexString(),
      propertyIdToDelete
    );

    // Verificar que la función no lance un error
    expect(result).to.be.undefined;

    // Verificar que la propiedad ya no existe en la base de datos
    const deletedProperty = await Property.findById(propertyIdToDelete);
    expect(deletedProperty).to.be.null;
  });

  it("should successfully delete a property by its ID", async () => {
    const ownerId = new ObjectId();

    // Crear una propiedad de prueba
    const newProperty = new Property({
      userId: ownerId,
      title: "Test Property",
      description: "This is a test property.",
      location: "Test Location",
      images: ["image1.jpg", "image2.jpg"],
      bedrooms: 3,
      airbnbUrl: "https://airbnb.com/test-property",
      type: "apartment",
    });
    const savedProperty = await newProperty.save();
    const propertyIdToDelete = savedProperty._id.toString();

    // Llamar a la función deleteProperty
    const result = await deleteProperty(
      ownerId.toHexString(),
      propertyIdToDelete
    );

    // Verificar que la función no lance un error
    expect(result).to.be.undefined;

    // Verificar que la propiedad ya no existe en la base de datos
    const deletedProperty = await Property.findById(propertyIdToDelete);
    expect(deletedProperty).to.be.null;
  });

  it("should throw a NotFoundError if the property ID does not exist", async () => {
    const nonExistentPropertyId = "nonexistentid123";
    const ownerId = new ObjectId();

    // Llamar a deleteProperty con un ID inexistente y verificar que lance NotFoundError
    try {
      await deleteProperty(ownerId.toHexString(), nonExistentPropertyId);
      expect.fail("Should have thrown a NotFoundError");
    } catch (error) {
      expect(error).to.be.an.instanceOf(NotFoundError);
      expect(error.message).to.equal("Property not found");
    }

    // Verificar que no se haya eliminado ninguna propiedad (aparte de las limpiadas en beforeEach)
    const propertiesCount = await Property.countDocuments({});
    expect(propertiesCount).to.equal(0);
  });

  afterEach(async () => {
    await Property.deleteMany({});
    console.info("Properties collection cleared after deleteProperty test");
  });

  after(async () => {
    await disconnectFromDatabase();
    console.info("Disconnected from database after deleteProperty tests");
  });
});

import "dotenv/config";
import { expect } from "chai";
import { deleteProperty } from "../_logic/index.js";
import mongoose from "mongoose";
import { Property } from "../../../lib/db/models/index.js";
import { errors } from "com";
const { NotFoundError, AuthorizationError, SystemError } = errors;
const { DATABASE_URL, DATABASE_NAME } = process.env;

describe("TEST deleteProperty", () => {
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
    await Property.deleteMany({});
    console.info("Properties collection cleared");
  });

  it("should throw SystemError if there is a database error", async () => {
    const mockError = new Error("Database connection failed");
    const originalFindByIdAndDelete = Property.findByIdAndDelete;
    Property.findByIdAndDelete = () => {
      throw mockError;
    };

    try {
      await deleteProperty("userId123", "propertyId123");
      throw new Error("Expected SystemError, but got no error");
    } catch (error) {
      expect(error).to.be.an.instanceOf(SystemError);
      expect(error.message).to.include("Database connection failed");
    }

    Property.findByIdAndDelete = originalFindByIdAndDelete;
  });

  it("should throw NotFoundError if the property does not exist", async () => {
    const originalFindByIdAndDelete = Property.findByIdAndDelete;
    Property.findByIdAndDelete = () => null;

    try {
      await deleteProperty("userId123", "nonExistingPropertyId");
      throw new Error("Expected NotFoundError, but got no error");
    } catch (error) {
      expect(error).to.be.an.instanceOf(NotFoundError);
      expect(error.message).to.include("Property not found");
    }

    Property.findByIdAndDelete = originalFindByIdAndDelete;
  });

  it("should throw AuthorizationError if the user does not have permission", async () => {
    const propertyData = {
      title: "Apartamento Nuevo",
      image: "https://example.com/image.jpg",
      description: "Bonito apartamento con vistas",
      location: "Barcelona",
      type: "apartment",
      bedrooms: 2,
      airbnbUrl: "https://airbnb.com/123",
      userId: "otherUserId123", // Usuario diferente al que intenta eliminar
    };

    const originalFindByIdAndDelete = Property.findByIdAndDelete;
    Property.findByIdAndDelete = () => propertyData;

    try {
      await deleteProperty("userId123", "propertyId123");
      throw new Error("Expected AuthorizationError, but got no error");
    } catch (error) {
      expect(error).to.be.an.instanceOf(AuthorizationError);
      expect(error.message).to.include("User does not have permission");
    }

    Property.findByIdAndDelete = originalFindByIdAndDelete;
  });

  it("should successfully delete a property if it exists and user has permission", async () => {
    const propertyData = {
      title: "Apartamento Nuevo",
      image: "https://example.com/image.jpg",
      description: "Bonito apartamento con vistas",
      location: "Barcelona",
      type: "apartment",
      bedrooms: 2,
      airbnbUrl: "https://airbnb.com/123",
      userId: "userId123", // El usuario tiene permiso
    };

    const originalFindByIdAndDelete = Property.findByIdAndDelete;
    Property.findByIdAndDelete = () => propertyData;

    const result = await deleteProperty("userId123", "propertyId123");
    expect(result).to.be.undefined;

    Property.findByIdAndDelete = originalFindByIdAndDelete;
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

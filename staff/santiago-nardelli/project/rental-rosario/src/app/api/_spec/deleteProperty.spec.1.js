import "dotenv/config";
import { expect } from "chai";
import { deleteProperty } from "../_logic/index.js";
import mongoose from "mongoose";

import { Property } from "../../../lib/db/models/index.js";
import { errors } from "com";
import sinon from "sinon"; // Importamos Sinon para el mockeo

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
    // Limpiar la colección antes de cada prueba
    await Property.deleteMany({});
    console.info("Properties collection cleared");
  });

  it("should throw SystemError if there is a database error", async () => {
    const propertyData = {
      title: "Apartamento Nuevo",
      image: "https://example.com/image.jpg",
      description: "Bonito apartamento con vistas",
      location: "Barcelona",
      type: "apartment",
      bedrooms: 2,
      airbnbUrl: "https://airbnb.com/123",
    };

    const mockError = new Error("Database connection failed");
    const stub = sinon.stub(Property, "findByIdAndDelete").throws(mockError); // Simulamos un error en findByIdAndDelete

    try {
      await deleteProperty("userId123", "propertyId123");
      // Si no se lanza el error esperado, fallará la prueba
      throw new Error("Expected SystemError, but got no error");
    } catch (error) {
      expect(error).to.be.an.instanceOf(SystemError);
      expect(error.message).to.include("Database connection failed");
    }

    // Restauramos la función original
    stub.restore();
  });

  it("should throw NotFoundError if the property does not exist", async () => {
    const stub = sinon.stub(Property, "findByIdAndDelete").returns(null); // Simulamos que no se encuentra la propiedad
    try {
      await deleteProperty("userId123", "nonExistingPropertyId");
      throw new Error("Expected NotFoundError, but got no error");
    } catch (error) {
      expect(error).to.be.an.instanceOf(NotFoundError);
      expect(error.message).to.include("Property not found");
    }
    stub.restore();
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
    const stub = sinon
      .stub(Property, "findByIdAndDelete")
      .returns(propertyData); // Simulamos que la propiedad fue encontrada

    try {
      await deleteProperty("userId123", "propertyId123"); // Intentamos eliminarla con un usuario diferente
      throw new Error("Expected AuthorizationError, but got no error");
    } catch (error) {
      expect(error).to.be.an.instanceOf(AuthorizationError);
      expect(error.message).to.include("User does not have permission");
    }

    stub.restore();
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

    const stub = sinon
      .stub(Property, "findByIdAndDelete")
      .returns(propertyData); // Simulamos que la propiedad fue encontrada y eliminada

    const result = await deleteProperty("userId123", "propertyId123");

    expect(result).to.equal(undefined); // Aquí podrías verificar que la propiedad fue eliminada correctamente, dependiendo de tu implementación

    stub.restore();
  });

  afterEach(async () => {
    await Property.deleteMany({});
    console.info("Properties collection cleared after deleteProperty test");
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

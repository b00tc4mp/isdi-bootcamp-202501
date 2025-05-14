import "dotenv/config";
import { expect } from "chai";
import mongoose from "mongoose";
import { deleteProperty } from "../_logic/index.js";
import { Property } from "../../../lib/db/models/index.js";
import { errors } from "com";

const { NotFoundError, ValidateError, SystemError } = errors;
const { DATABASE_URL, DATABASE_NAME } = process.env;
describe("deleteProperty", () => {
  const validUserId = "userId123"; // Cumple con validate.id
  const validPropertyId = new mongoose.Types.ObjectId(); // Generar un ObjectId válido
  const invalidId = ""; // No cumple con validate.id
  const propertyData = {
    title: "Sample Property",
    image: "https://example.com/image.jpg",
    description: "A beautiful property",
    location: "Somewhere",
    type: "house",
    bedrooms: 3,
    airbnbUrl: "https://airbnb.com/sample",
    userId: validUserId,
  };

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
    const property = new Property({ ...propertyData, _id: validPropertyId });
    await property.save();
  });

  it("debería eliminar correctamente una propiedad existente", async () => {
    const validPropertyId = new mongoose.Types.ObjectId(); // Generamos un ObjectId válido

    // Crear la propiedad con un _id válido
    const property = new Property({ ...propertyData, _id: validPropertyId });
    await property.save();

    // Convertir el ID a string para pasarlo a la función de eliminación
    await deleteProperty(validUserId, validPropertyId.toString());

    // Verificar que la propiedad fue eliminada
    const foundProperty = await Property.findById(validPropertyId);
    expect(foundProperty).to.be.null;
  });

  it("debería lanzar NotFoundError cuando la propiedad no existe", async () => {
    const nonExistentPropertyId = "nonExistent123"; // Cumple con validate.id pero no existe
    try {
      await deleteProperty(validUserId, nonExistentPropertyId);
      throw new Error("Debería haber lanzado un NotFoundError");
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.equal("Property not found");
    }
  });

  it("debería lanzar ValidateError cuando el userId es inválido", async () => {
    try {
      await deleteProperty(invalidId, validPropertyId);
      throw new Error("Debería haber lanzado un ValidateError");
    } catch (error) {
      expect(error).to.be.instanceOf(ValidateError);
      expect(error.message).to.match(/Invalid userId/);
    }
  });

  it("debería lanzar ValidateError cuando el propertyId es inválido", async () => {
    try {
      await deleteProperty(validUserId, invalidId);
      throw new Error("Debería haber lanzado un ValidateError");
    } catch (error) {
      expect(error).to.be.instanceOf(ValidateError);
      expect(error.message).to.match(/Invalid propertyId/);
    }
  });

  it("debería lanzar SystemError cuando ocurre un error de base de datos", async () => {
    try {
      // Forzar un error de conexión a la base de datos
      await mongoose.disconnect();
      await deleteProperty(validUserId, validPropertyId.toString());
      throw new Error("Debería haber lanzado un SystemError");
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.match(/Error deleting property/);
    } finally {
      // Reconectar para las siguientes pruebas
      await mongoose.connect(process.env.DATABASE_URL, {
        dbName: process.env.DATABASE_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  afterEach(async () => {
    await Property.deleteMany({});
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

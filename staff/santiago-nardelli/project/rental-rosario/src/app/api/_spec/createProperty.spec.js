import "dotenv/config";
import { Property } from "../../../lib/db/models/index.js";
import { errors, validate } from "com";
import { createProperty } from "../_logic/index.js";
import mongoose from "mongoose";
import { expect } from "chai";
import sinon from "sinon"; // Importamos Sinon para el mockeo

const { SystemError, DuplicityError, ValidateError } = errors;
const { DATABASE_URL, DATABASE_NAME } = process.env;

describe("createProperty", () => {
  let connection; // Esto puede ayudar a gestionar la conexión manualmente.

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

  const validPropertyData = {
    title: "Apartamento Nuevo",
    image: "https://example.com/image.jpg",
    description: "Bonito apartamento con vistas",
    location: "Barcelona",
    type: "apartment",
    bedrooms: 2,
    airbnbUrl: "https://airbnb.com/123",
  };

  it("should successfully create a new property", async () => {
    // Intentamos crear una propiedad.
    const property = await createProperty(validPropertyData);
    expect(property).to.be.an("object");
    expect(property).to.have.property("id").that.is.a("string");
    expect(property.title).to.equal(validPropertyData.title);
    expect(property.description).to.equal(validPropertyData.description);
    expect(property.location).to.equal(validPropertyData.location);
    expect(property.type).to.equal(validPropertyData.type);
    expect(property.bedrooms).to.equal(validPropertyData.bedrooms);
    expect(property.images).to.deep.equal([validPropertyData.image]);
    expect(property.airbnbUrl).to.equal(validPropertyData.airbnbUrl);

    // Verificamos que la propiedad haya sido guardada en la base de datos.
    const propertyInDb = await Property.findById(property.id).lean();
    expect(propertyInDb).to.exist;
    expect(propertyInDb.title).to.equal(validPropertyData.title);
  });
  it("should throw DuplicityError if property already exists", async () => {
    const propertyData = {
      title: "Apartamento Nuevo",
      image: "https://example.com/image.jpg",
      description: "Bonito apartamento con vistas",
      location: "Barcelona",
      type: "apartment",
      bedrooms: 2,
      airbnbUrl: "https://airbnb.com/123",
    };

    // Simulamos que la propiedad ya existe en la base de datos
    const existingProperty = {
      title: "Apartamento Nuevo",
      location: "Barcelona",
    };
    const stub = sinon.stub(Property, "findOne").resolves(existingProperty); // Simulamos una propiedad existente

    try {
      await createProperty(propertyData);
      // Si no se lanza el error esperado, fallará la prueba
      throw new Error("Expected DuplicityError, but got no error");
    } catch (error) {
      expect(error).to.be.an.instanceOf(DuplicityError);
      expect(error.message).to.include("Property already exists");
    }

    stub.restore();
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
    const stub = sinon.stub(Property, "findOne").throws(mockError); // Simulamos un error en findOne

    try {
      await createProperty(propertyData);
      // Si no se lanza el error esperado, fallará la prueba
      throw new Error("Expected SystemError, but got no error");
    } catch (error) {
      expect(error).to.be.an.instanceOf(SystemError);
      expect(error.message).to.include("Database connection failed");
    }

    // Restauramos la función original
    stub.restore();
  });

  it("should throw ValidateError if title is too short", () => {
    const propertyData = {
      title: "a",
      image: "https://example.com/image.jpg",
      description: "Bonito apartamento con vistas",
      location: "Barcelona",
      type: "apartment",
      bedrooms: 2,
      airbnbUrl: "https://airbnb.com/123",
    };
    expect(() => {
      validate.text(
        propertyData.title,
        { minLength: 3, maxLength: 50 },
        "title"
      );
    })
      .to.throw(ValidateError)
      .with.property("message")
      .that.includes("Invalid title");
  });

  it("should throw ValidateError if image URL is invalid", () => {
    const propertyData = { image: "not-a-valid-url" };
    expect(() => {
      validate.url(propertyData.image, "image");
    })
      .to.throw(ValidateError)
      .with.property("message")
      .that.includes("Invalid URL");
  });

  it("should throw ValidateError if description is too short", () => {
    const propertyData = { description: "a" };
    expect(() => {
      validate.text(
        propertyData.description,
        { minLength: 3, maxLength: 500 },
        "description"
      );
    })
      .to.throw(ValidateError)
      .with.property("message")
      .that.includes("Invalid description");
  });

  it("should throw ValidateError if location is too short", () => {
    const propertyData = { location: "a" };
    expect(() => {
      validate.text(
        propertyData.location,
        { minLength: 3, maxLength: 50 },
        "location"
      );
    })
      .to.throw(ValidateError)
      .with.property("message")
      .that.includes("Invalid location");
  });
  it("should throw ValidateError if type is empty", () => {
    const propertyData = { type: "" };
    expect(() => {
      validate.text(propertyData.type, { minLength: 1 }, "type");
    })
      .to.throw(ValidateError)
      .with.property("message")
      .that.includes("Invalid type");
  });
  it("should throw ValidateError if bedrooms is not a number", () => {
    const propertyData = { bedrooms: "not-a-number" };
    expect(() => {
      validate.number(propertyData.bedrooms, "bedrooms");
    })
      .to.throw(ValidateError)
      .with.property("message")
      .that.includes("Invalid number");
  });

  it("should throw ValidateError if airbnbUrl is invalid", () => {
    const propertyData = { airbnbUrl: "not-a-valid-url" };
    expect(() => {
      validate.url(propertyData.airbnbUrl, "airbnbUrl");
    })
      .to.throw(ValidateError)
      .with.property("message")
      .that.includes("Invalid URL");
  });

  afterEach(async () => {
    // Limpiar la colección después de cada prueba
    await Property.deleteMany({});
    console.info("Properties collection cleared after test");
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

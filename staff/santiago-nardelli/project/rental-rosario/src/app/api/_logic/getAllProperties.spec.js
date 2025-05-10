import "dotenv/config";
import { Property } from "../../../lib/db/models/index.js";
import { errors } from "com";
import { getAllProperties } from "./getAllProperties.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../lib/db/index.js";
import { expect } from "chai";

const { SystemError } = errors;
const { DATABASE_URL, DATABASE_NAME } = process.env;

describe("getAllProperties", () => {
  before(async () => {
    await connectToDatabase(DATABASE_URL, DATABASE_NAME);
    console.info("Connected to database");
  });

  beforeEach(async () => {
    await Property.deleteMany({});
    console.info("Properties collection cleared");
  });

  it("should return an empty array if no properties exist", async () => {
    const properties = await getAllProperties();
    expect(properties).to.be.an("array").that.is.empty;
  });

  it("should return an array of properties sorted by title", async () => {
    const property1 = {
      title: "Casa Bonita",
      description: "Una casa hermosa",
      location: "Las afueras",
      images: ["image1.jpg", "image2.jpg"],
      airbnbUrl: "https://airbnb.com/house1",
      type: "house",
      bedrooms: 3,
    };
    const property2 = {
      title: "Apartamento Centrico",
      description: "En el corazón de la ciudad",
      location: "Centro",
      images: ["image1.jpg", "image2.jpg"],
      airbnbUrl: "https://airbnb.com/apartment1",
      type: "apartment",
      bedrooms: 2,
    };
    const property3 = {
      title: "Villa de Lujo",
      description: "Con todas las comodidades",
      location: "Las afueras",
      images: ["image3.jpg", "image4.jpg"],
      airbnbUrl: "https://airbnb.com/villa1",
      type: "house",
      bedrooms: 4,
    };

    await Property.insertMany([property3, property1, property2]);

    const properties = await getAllProperties();

    expect(properties).to.be.an("array").with.lengthOf(3);
    expect(properties[0].title).to.equal("Apartamento Centrico");
    expect(properties[1].title).to.equal("Casa Bonita");
    expect(properties[2].title).to.equal("Villa de Lujo");

    properties.forEach((property) => {
      expect(property).to.have.property("id").that.is.a("string");
      expect(property).to.have.property("title").that.is.a("string");
      expect(property).to.have.property("description").that.is.a("string");
      expect(property).to.not.have.property("_id");
      expect(property).to.not.have.property("__v");
    });
  });

  it("should throw a SystemError if the database query fails", async () => {
    const errorMessage = "Database query failed";
    const originalPropertyFind = Property.find;

    // Simula un error en la consulta a la base de datos
    Property.find = () => {
      throw new Error(errorMessage);
    };

    let caughtError;
    try {
      await getAllProperties();
      expect.fail("Should have thrown a SystemError");
    } catch (error) {
      caughtError = error;
    } finally {
      // Restaura la función original para no afectar otras pruebas
      Property.find = originalPropertyFind;
    }

    expect(caughtError).to.be.instanceOf(SystemError);
    expect(caughtError.message).to.equal(
      `Error fetching properties: ${errorMessage}`
    );
  });

  afterEach(async () => {
    await Property.deleteMany({});
    console.info("Properties collection cleared after test");
  });

  after(async () => {
    await disconnectFromDatabase();
    console.info("Disconnected from database");
  });
});

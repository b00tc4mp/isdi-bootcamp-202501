import "dotenv/config";
import { Property } from "../../../lib/db/models/index.js";
import { errors } from "com";
import { getFilteredProperties } from "../_logic/index.js";
import mongoose from "mongoose";
import { expect } from "chai";
import sinon from "sinon";

const { SystemError, NotFoundError } = errors;
const { DATABASE_URL, DATABASE_NAME } = process.env;

describe("getFilteredProperties", () => {
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
    console.info(
      "Properties collection cleared for getFilteredProperties test"
    );
  });

  it("should return an array of properties matching the filter", async () => {
    const property1 = new Property({
      title: "Casa Bonita",
      description: "Una casa hermosa",
      location: "Las afueras",
      images: ["image1.jpg", "image2.jpg"],
      airbnbUrl: "https://airbnb.com/house1",
      type: "house",
      bedrooms: 3,
    });
    const property2 = new Property({
      title: "Apartamento Centrico",
      description: "En el corazón de la ciudad",
      location: "Centro",
      images: ["image1.jpg", "image2.jpg"],
      airbnbUrl: "https://airbnb.com/apartment1",
      type: "apartment",
      bedrooms: 2,
    });
    const property3 = new Property({
      title: "Casa Moderna",
      description: "Casa de diseño",
      location: "Centro",
      images: ["image3.jpg", "image4.jpg"],
      airbnbUrl: "https://airbnb.com/house2",
      type: "house",
      bedrooms: 3,
    });

    await Property.insertMany([property1, property2, property3]);

    const filter = { type: "house", bedrooms: "3" };
    const properties = await getFilteredProperties(filter);

    expect(properties).to.be.an("array").with.lengthOf(2);
    expect(properties[0].title).to.equal("Casa Bonita");
    expect(properties[1].title).to.equal("Casa Moderna");
  });

  it("should return an array of properties sorted by title", async () => {
    const property1 = new Property({
      title: "Casa Bonita",
      description: "Una casa hermosa",
      location: "Las afueras",
      images: ["image1.jpg", "image2.jpg"],
      airbnbUrl: "https://airbnb.com/house1",
      type: "house",
      bedrooms: 3,
    });
    const property2 = new Property({
      title: "Apartamento Centrico",
      description: "En el corazón de la ciudad",
      location: "Centro",
      images: ["image1.jpg", "image2.jpg"],
      airbnbUrl: "https://airbnb.com/apartment1",
      type: "apartment",
      bedrooms: 2,
    });
    const property3 = new Property({
      title: "Villa Lujo",
      description: "Con todas las comodidades",
      location: "Las afueras",
      images: ["image3.jpg", "image4.jpg"],
      airbnbUrl: "https://airbnb.com/villa1",
      type: "house",
      bedrooms: 4,
    });

    await Property.insertMany([property1, property2, property3]);

    const filter = { type: "house", bedrooms: "3" };
    const properties = await getFilteredProperties(filter);

    expect(properties).to.be.an("array").with.lengthOf(1);
    expect(properties[0].title).to.equal("Casa Bonita");
  });

  it("should throw NotFoundError if no properties match the filter", async () => {
    const filter = { type: "villa", bedrooms: "5" }; // No hay propiedades que coincidan
    try {
      await getFilteredProperties(filter);
      throw new Error("Expected NotFoundError, but got no error");
    } catch (error) {
      expect(error).to.be.an.instanceOf(NotFoundError);
      expect(error.message).to.include(
        "No se encontraron propiedades con los filtros especificados."
      );
    }
  });

  it("should throw SystemError if the database query fails", async () => {
    const errorMessage = "Database query failed";
    const findStub = sinon
      .stub(Property, "find")
      .throws(new Error(errorMessage));

    try {
      const filter = { type: "house" };
      await getFilteredProperties(filter);
      expect.fail("Should have thrown a SystemError");
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.equal(
        `Error fetching properties: ${errorMessage}`
      );
    } finally {
      findStub.restore();
    }
  });

  afterEach(async () => {
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

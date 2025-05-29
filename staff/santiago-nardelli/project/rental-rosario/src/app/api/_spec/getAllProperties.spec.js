import "dotenv/config";
import { Property } from "../../../lib/db/models/index.js";
import { errors } from "com";
import { getAllProperties } from "../_logic/index.js";
import mongoose from "mongoose";
import { expect } from "chai";
import sinon from "sinon";

const { SystemError, NotFoundError } = errors;
const { DATABASE_URL, DATABASE_NAME } = process.env;

describe("getAllProperties", () => {
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
    console.info("Properties collection cleared for getAllProperties test");
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
      title: "Villa de Lujo",
      description: "Con todas las comodidades",
      location: "Las afueras",
      images: ["image3.jpg", "image4.jpg"],
      airbnbUrl: "https://airbnb.com/villa1",
      type: "house",
      bedrooms: 4,
    });

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

  it("should throw NotFoundError if no properties exist", async () => {
    try {
      const properties = await getAllProperties();
      throw new Error("Expected NotFoundError, but got no error");
    } catch (error) {
      expect(error).to.be.an.instanceOf(NotFoundError);
      expect(error.message).to.include("No properties found");
    }
  });

  it("should throw a SystemError if the database query fails", async () => {
    const errorMessage = "Database query failed";
    const findStub = sinon
      .stub(Property, "find")
      .throws(new Error(errorMessage));

    try {
      await getAllProperties();
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

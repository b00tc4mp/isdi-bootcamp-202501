import "dotenv/config";
import { Property } from "../../../lib/db/models/index.js";
import { errors } from "com";
import { createProperty } from "./createProperty.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../lib/db/index.js";
import { expect } from "chai";

const { SystemError, DuplicityError, ValidateError } = errors;
const { DATABASE_URL, DATABASE_NAME } = process.env;

describe("createProperty", () => {
  before(async () => {
    await connectToDatabase(DATABASE_URL, DATABASE_NAME);
    console.info("Connected to database");
  });

  beforeEach(async () => {
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

    const propertyInDb = await Property.findById(property.id).lean();
    expect(propertyInDb).to.exist;
    expect(propertyInDb.title).to.equal(validPropertyData.title);
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

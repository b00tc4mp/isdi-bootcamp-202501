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
  let connection; // Esto puede ayudar a gestionar la conexión manualmente.

  before(async () => {
    // Asegurándonos de que la conexión se establezca antes de que comiencen las pruebas.
    connection = await connectToDatabase(DATABASE_URL, DATABASE_NAME);
    console.info("Connected to database");
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

  afterEach(async () => {
    // Limpiar la colección después de cada prueba
    await Property.deleteMany({});
    console.info("Properties collection cleared after test");
  });

  after(async () => {
    // Cerrar la conexión con la base de datos después de todas las pruebas.
    await disconnectFromDatabase();
    console.info("Disconnected from database");
  });
});

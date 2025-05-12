import "dotenv/config";
import { Property } from "../../../lib/db/models/index.js";
import { errors } from "com";
import { getFilteredProperties } from "./getFilteredProperties.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../lib/db/index.js";
import { expect } from "chai";

const { SystemError } = errors;
const { DATABASE_URL, DATABASE_NAME } = process.env;

describe("getFilteredProperties", () => {
  before(async () => {
    try {
      await connectToDatabase(DATABASE_URL, DATABASE_NAME);
      console.info("Connected to database");
    } catch (error) {
      console.error("Database connection failed", error);
      throw error; // Falla las pruebas si no se puede conectar a la base de datos
    }
  });

  beforeEach(async () => {
    // Asegúrate de que la colección esté vacía antes de cada prueba
    await Property.deleteMany({});
    console.info("Properties collection cleared");

    // Insertar los datos de prueba
    await Property.insertMany(propertiesData);
    console.info("Test properties inserted");
  });

  const propertiesData = [
    {
      title: "Apartamento A",
      type: "apartment",
      bedrooms: 2,
      airbnbUrl: "https://www.airbnb.com/rooms/1",
      location: "Rosario",
      description: "Un apartamento cómodo.",
    },
    {
      title: "Casa B",
      type: "house",
      bedrooms: 3,
      airbnbUrl: "https://www.airbnb.com/rooms/2",
      location: "Santa Fe",
      description: "Una casa amplia.",
    },
    {
      title: "Estudio C",
      type: "studio",
      bedrooms: 1,
      airbnbUrl: "https://www.airbnb.com/rooms/3",
      location: "Buenos Aires",
      description: "Estudio para una persona.",
    },
    {
      title: "Casa D",
      type: "house",
      bedrooms: 2,
      airbnbUrl: "https://www.airbnb.com/rooms/4",
      location: "Córdoba",
      description: "Casa en la montaña.",
    },
    {
      title: "Apartamento E",
      type: "apartment",
      bedrooms: 3,
      airbnbUrl: "https://www.airbnb.com/rooms/5",
      location: "Mendoza",
      description: "Apartamento céntrico.",
    },
  ];

  it("should return all properties when no filter is provided", async () => {
    const properties = await getFilteredProperties({});
    expect(properties).to.be.an("array").with.lengthOf(propertiesData.length);
    expect(properties.map((p) => p.title)).to.deep.equal([
      "Apartamento A",
      "Apartamento E",
      "Casa B",
      "Casa D",
      "Estudio C",
    ]); // Sorted by title
  });

  // Otros tests...

  afterEach(async () => {
    // Limpiar la colección después de cada prueba
    await Property.deleteMany({});
    console.info("Properties collection cleared after test");
  });

  after(async () => {
    try {
      await disconnectFromDatabase();
      console.info("Disconnected from database");
    } catch (error) {
      console.error("Failed to disconnect from the database", error);
      throw error; // Asegúrate de que la desconexión también sea exitosa
    }
  });
});

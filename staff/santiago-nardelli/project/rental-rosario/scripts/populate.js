import mongoose from "mongoose";
import { Property } from "../src/lib/db/models/index.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../src/lib/db/index.js";

async function populateDatabase() {
  try {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    console.log("DATABASE_NAME:", process.env.DATABASE_NAME);
    await connectToDatabase();
    console.log("Conectado a la base de datos");

    // Array de objetos con los datos de las propiedades que quieres crear
    const propertiesToCreate = [
      {
        title: "loft",
        description: "loft departamento en el centro de Rosario",
        location: "loft, Argentina",
        type: "house",
        bedrooms: 3,
        images: [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg",
        ],
        airbnbUrl: "https://airbnb.com/example",
      },
      {
        title: "Apartamento con vistas al mar",
        description: "Precioso apartamento con vistas panorámicas.",
        location: "Barcelona, España",
        type: "apartment",
        bedrooms: 2,
        images: ["https://example.com/image3.jpg"],
        airbnbUrl: "https://airbnb.com/another-example",
      },
      {
        title: "Casa de campo",
        description: "Casa de campo con jardín y piscina.",
        location: "Madrid, España",
        type: "house",
        bedrooms: 4,
        images: ["https://example.com/image4.jpg"],
        airbnbUrl: "https://airbnb.com/yet-another-example",
      },
      {
        title: "Estudio moderno",
        description: "Estudio moderno en el corazón de la ciudad.",
        location: "Valencia, España",
        type: "studio",
        bedrooms: 1,
        images: ["https://example.com/image5.jpg"],
        airbnbUrl: "https://airbnb.com/some-other-example",
      },
      {
        title: "Casa de playa",
        description: "Casa de playa con acceso directo a la playa.",
        location: "Malaga, España",
        type: "house",
        bedrooms: 3,
        images: ["https://example.com/image6.jpg"],
        airbnbUrl: "https://airbnb.com/another-example",
      },
      {
        title: "Apartamento en el centro",
        description: "Apartamento céntrico con todas las comodidades.",
        location: "Sevilla, España",
        type: "apartment",
        bedrooms: 2,
        images: ["https://example.com/image7.jpg"],
        airbnbUrl: "https://airbnb.com/another-example",
      },
      {
        title: "Casa rural",
        description: "Casa rural en un entorno natural.",
        location: "Granada, España",
        type: "house",
        bedrooms: 5,
        images: ["https://example.com/image8.jpg"],
        airbnbUrl: "https://airbnb.com/another-example",
      },
      {
        title: "Loft industrial",
        description: "Loft industrial con estilo moderno.",
        location: "Bilbao, España",
        type: "loft",
        bedrooms: 1,
        images: ["https://example.com/image9.jpg"],
        airbnbUrl: "https://airbnb.com/another-example",
      },
      {
        title: "Casa de montaña",
        description: "Casa de montaña con vistas espectaculares.",
        location: "Sierra Nevada, España",
        type: "house",
        bedrooms: 4,
        images: ["https://example.com/image10.jpg"],
        airbnbUrl: "https://airbnb.com/another-example",
      },
    ];

    // Itera sobre el array y crea los documentos en la base de datos
    for (const propertyData of propertiesToCreate) {
      const newProperty = new Property(propertyData);
      await newProperty.save();
      console.log(`Propiedad "${newProperty.title}" creada.`);
    }

    console.log("Proceso de población completado.");
  } catch (error) {
    console.error("Error durante la población de la base de datos:", error);
    await mongoose.disconnect();
  } finally {
    await disconnectFromDatabase();
    console.log("Desconectado de la base de datos");
  }
}

// Ejecuta la función de población
populateDatabase();

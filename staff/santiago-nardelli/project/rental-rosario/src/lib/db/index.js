import "dotenv/config"; // Cargar variables de entorno desde .env
import mongoose from "mongoose";

const { MONGODB_URI, DATABASE_URL, DATABASE_NAME } = process.env;

// Decide qué URI usar
let DATABASE_URI;

if (MONGODB_URI) {
  DATABASE_URI = MONGODB_URI;
} else if (DATABASE_URL && DATABASE_NAME) {
  DATABASE_URI = `${DATABASE_URL}/${DATABASE_NAME}`;
} else {
  throw new Error("No se ha definido ninguna URI para la base de datos");
}

// if (DATABASE_URL && DATABASE_NAME) {
//   DATABASE_URI = `${DATABASE_URL}/${DATABASE_NAME}`;
// } else if (MONGODB_URI) {
//   DATABASE_URI = MONGODB_URI;
// } else {
//   throw new Error("No se ha definido ninguna URI para la base de datos");
// }

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(DATABASE_URI).then((mongoose) => {
      console.log(
        `Conectado a MongoDB: ${
          DATABASE_URI.includes("localhost") ? "local" : "Atlas"
        }`
      );
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error(
      `Error de conexión a MongoDB (${DATABASE_URI}):`,
      error.message
    );
    throw error;
  }
}

export async function disconnectFromDatabase() {
  if (!cached.conn) {
    console.log("No hay conexión activa para desconectar");
    return;
  }

  try {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
    cached.conn = null;
  } catch (error) {
    console.error("Error al desconectar de MongoDB:", error.message);
    throw error;
  }
}

// Manejo de señales del sistema
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

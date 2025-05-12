import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI no está definido en las variables de entorno");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => {
        console.log("Conectado a MongoDB Atlas");
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Error de conexión a MongoDB Atlas:", error.message);
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

process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

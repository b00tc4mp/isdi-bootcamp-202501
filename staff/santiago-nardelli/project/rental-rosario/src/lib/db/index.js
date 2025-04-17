import mongoose from "mongoose";

const { DATABASE_URL, DATABASE_NAME } = process.env;

// Validación de variables de entorno críticas
if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL no está definido en el archivo de configuración"
  );
}

// Usar una conexión global para evitar múltiples conexiones en desarrollo
// cambiarlo en producción, este manejo global no es necesario, ya que el servidor no se reinicia constantemente.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  //console.debug(`connecting to ${DATABASE_URL}/${DATABASE_NAME}`);

  if (cached.conn) {
    return cached.conn;
  } //==> cached.conn es null, significa que no hay conexión activa, por lo que se procede a crear una nueva conexión

  if (!cached.promise) {
    //Verificar esta construccion
    const connectionString = DATABASE_NAME
      ? `${DATABASE_URL}/${DATABASE_NAME}`
      : DATABASE_URL;

    cached.promise = mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => {
        console.log("Conectado a la base de datos");
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error.message);
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
    console.log("Desconectado de la base de datos");
    cached.conn = null;
  } catch (error) {
    console.error("Error al desconectar de la base de datos:", error.message);
    throw error;
  }
}

// Manejo de cierre del proceso (opcional en entornos de producción)
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { DATABASE_URL, DATABASE_NAME } = process.env;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL no está definido");
}

const data = {
  connect(url = DATABASE_URL, dbName = DATABASE_NAME) {
    return mongoose
      .connect(`${url}/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Conectado a la base de datos");
      })
      .catch((err) => {
        console.error("Error de conexión a la base de datos:", err);
        throw err;
      });
  },

  disconnect() {
    return mongoose
      .disconnect()
      .then(() => {
        console.log("Desconectado de la base de datos");
      })
      .catch((err) => {
        console.error("Error al desconectar de la base de datos:", err);
        throw err;
      });
  },
};

export default data;
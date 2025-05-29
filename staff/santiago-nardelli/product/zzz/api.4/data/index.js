import mongoose, { Types } from "mongoose"; // ==> importo mongoose y Types de mongoose
import { User, Post } from "./models.js"; // ==> importo los modelos de mongoose
import { errors } from "com";

const { ObjectId } = Types; // ==> importo ObjectId de mongoose

const { SystemError } = errors;

const data = {
  connect(url, dbName) {
    return mongoose.connect(`${url}/${dbName}`).catch((error) => {
      new SystemError("Error connecting to database"(error.message));
    });
  },
  disconnect() {
    return mongoose.disconnect(); // ==> cierro la conexión a la base de datos
  },

  ObjectId, //==> exporto ObjectId por que lo utilizo en otros archivos
};

export { data, User,Post, ObjectId };

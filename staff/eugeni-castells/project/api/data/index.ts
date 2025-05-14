import mongoose from "mongoose";
import {
  User,
  Trip,
  Van,
  Doc,
  Location,
  Review,
  Chat,
  ChatComment,
} from "./models/index.js";
import {
  UserDocType,
  DocDocType,
  LocationDocType,
  PointDocType,
  ReviewDocType,
  TripDocType,
  VanDocType,
  ChatDocType,
} from "./types.js";
import { errors } from "com";

const { SystemError } = errors;

const data = {
  connect(url: string, dbName: string) {
    return mongoose.connect(`${url}/${dbName}`).catch((error) => {
      throw new SystemError(error.message);
    });
  },

  disconnect() {
    return mongoose.disconnect();
  },
};

export {
  data,
  User,
  Trip,
  Van,
  Doc,
  Location,
  Review,
  UserDocType,
  DocDocType,
  LocationDocType,
  PointDocType,
  ReviewDocType,
  TripDocType,
  VanDocType,
  Chat,
  ChatComment,
  ChatDocType,
};

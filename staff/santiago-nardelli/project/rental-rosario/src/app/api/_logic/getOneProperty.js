// src/_logic/functions/retrieveProperty.js
import { Property } from "../../../lib/db/models/index.js";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export const getOneProperty = async (propertyId) => {
  validate.id(propertyId, "propertyId");

  try {
    const property = await Property.findById(propertyId).lean();

    if (!property) {
      throw new NotFoundError(`Property with id ${propertyId} not found`);
    }

    return property;
  } catch (error) {
    throw new SystemError(error.message);
  }
};

import { errorHandler } from "./errorHandler.js";

export const withErrorHandling = (callback) => {
  return async (req, res, params) => {
    try {
      return await callback(req, res, params);
    } catch (error) {
      return errorHandler(error, req, res);
    }
  };
};

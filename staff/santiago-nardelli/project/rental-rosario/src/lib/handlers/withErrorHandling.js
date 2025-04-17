import { errorHandler } from './errorHandler.js';

export const withErrorHandling = (callback) => {
  return async (req, res) => {
    try {
      return await callback(req, res);
    } catch (error) {
      return await errorHandler(error, req, res); 
    }
  };
};


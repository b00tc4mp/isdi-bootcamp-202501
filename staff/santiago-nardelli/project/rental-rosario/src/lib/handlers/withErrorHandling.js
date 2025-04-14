import { errorHandler } from './errorHandler';

export const withErrorHandling = (callback) => {
  return async (req, res) => {
    try {
      await callback(req, res);
    } catch (error) {
      errorHandler(error, req, res); 
    }
  };
};

  
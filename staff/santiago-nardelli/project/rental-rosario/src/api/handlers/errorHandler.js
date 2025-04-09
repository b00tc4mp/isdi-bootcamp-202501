const errorHandler = (err, req, res, next) => {
    console.error(err); // Log de los errores
  
    let statusCode = 500;
    let errorType = 'system'; // Error por defecto
  
    // Definir códigos de error y redirigir al frontend
    if (err.name === 'DuplicityError') {
      statusCode = 400;
      errorType = 'duplicity';
    } else if (err.name === 'CredentialsError') {
      statusCode = 401;
      errorType = 'credentials';
    } else if (err.name === 'NotFoundError') {
      statusCode = 404;
      errorType = 'notfound';
    } else if (err.name === 'OwnershipError') {
      statusCode = 403;
      errorType = 'ownership';
    } else if (err.name === 'ValidationError') {
      statusCode = 422;
      errorType = 'validation';
    } else if (err.name === 'AuthorizationError') {
      statusCode = 401;
      errorType = 'authorization';
    }
  
    // Redirigir al frontend con el tipo de error (como parte de la URL)
    res.redirect(`/error/${errorType}`);
  };
  
  module.exports = errorHandler;
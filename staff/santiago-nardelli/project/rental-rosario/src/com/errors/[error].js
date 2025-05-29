
import React from 'react';

const ErrorPage = ({ errorMessage }) => {
  return (
    <div className="error-page">
      <h1>{errorMessage}</h1>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { error } = params; // Obtener el error desde la URL (ejemplo: /errores/duplicity)
  
  let errorMessage = 'Ha ocurrido un error.';

  // Aquí definimos los diferentes errores y sus mensajes
  switch (error) {
    case 'duplicity':
      errorMessage = 'Ya existe una propiedad con esta información.';
      break;
    case 'credentials':
      errorMessage = 'Las credenciales proporcionadas no son correctas.';
      break;
    case 'notfound':
      errorMessage = 'El recurso que buscas no fue encontrado.';
      break;
    case 'ownership':
      errorMessage = 'No tienes permisos para modificar esta propiedad.';
      break;
    case 'validation':
      errorMessage = 'Los datos proporcionados no son válidos.';
      break;
    case 'authorization':
      errorMessage = 'No tienes permiso para acceder a este recurso.';
      break;
    default:
      errorMessage = 'Ha ocurrido un error inesperado.';
  }

  return {
    props: { errorMessage }, // Pasamos el mensaje de error como prop
  };
}

export default ErrorPage;

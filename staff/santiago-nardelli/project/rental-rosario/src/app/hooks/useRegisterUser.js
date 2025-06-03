import { registerUserRequest } from "../_logic/functions/registerUserRequest";
import { useState } from "react";

export const useRegisterUser = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const registerUser = async (name, email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Llama a la función que realiza la solicitud de registro
      await registerUserRequest(name, email, password);
      setSuccess(true);
      return true; // Indica que el registro fue exitoso
    } catch (err) {
      setError(err.message); // Captura el mensaje de error
      return false; // Indica que hubo un error en el registro
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  // Devuelve la función y los estados
  return { registerUser, error, loading, success };
};

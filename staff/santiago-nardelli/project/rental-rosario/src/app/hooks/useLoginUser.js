"use client";

import { loginUserRequest } from "../_logic/functions/loginUserRequest";
import { useState, useEffect } from "react";
import { data } from "../_data/index.js";
import { set } from "mongoose";

export const useLoginUser = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!data.token); // Verifica si hay un token en el localStorage al cargar el componente
  }, []);
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Llama a la función que realiza la solicitud de inicio de sesión
      const authData = await loginUserRequest(email, password);
      // Si la respuesta es exitosa, guarda el token en el localStorage
      if (authData && authData.token) {
        setIsAuthenticated(true); // Actualiza el estado de autenticación
        return true;
      } else {
        setError("Invalid credentials"); // Establece un mensaje de error si las credenciales son inválidas
        setIsAuthenticated(false); // Actualiza el estado de autenticación
        return false; // Indica que el inicio de sesión falló
      }
    } catch (err) {
      setError(err.message); // Captura el mensaje de error
      setIsAuthenticated(false);
      return false; // Indica que hubo un error en el inicio de sesión
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };
  const logout = () => {
    data.token = null; // Utiliza el setter para eliminar el token (se stringify a "null" y tu getter lo parsea como null)
    setIsAuthenticated(false);
  };

  return { login, logout, isAuthenticated, error, loading };
};

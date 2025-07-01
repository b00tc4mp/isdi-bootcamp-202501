import { logic } from "../logic/logic.js";

import { errors } from "com";

const { SystemError, ValidateError } = errors;
export function Register({ onRegisterSubmit, onLoginClick }) {
  /*Creo mifuncion que maneja el evento de submit del formulario de registro
  y evito que se ejecute el submit por defecto y refresh de la pagina
  */
  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    console.log("Register Data Submit");
    try {
      // Extraigo el formulario del evento
      const { target: form } = event;

      // Extraigo los valores de los inputs del formulario
      const {
        name: { value: name },
        email: { value: email },
        password: { value: password },
      } = form;

      // LLamo a mi funcion de la logica para registrar un usuario
      logic
        .registerUser(name, email, password)
        .then(() => {
          form.reset();
          onRegisterSubmit();
        })
        .catch((error) => {
          console.error(error);
          if (error instanceof SystemError) {
            alert("⛔" + error.message);
          } else alert("❌" + error.message);
        });
    } catch (error) {
      console.error(error);

      if (error instanceof ValidateError) {
        alert("⛔" + error.message);
      } else {
        alert("❌" + error.message);
      }
    }
  };

  const handleLoginClick = () => {
    onLoginClick();
  };
  console.debug("Register -> render");

  return (
    <div className="landing-page">
      <div className="landing-page__icon">
        <h1 className="fa-solid fa-user-secret"></h1>
      </div>
      <form className="form-container" onSubmit={handleRegisterSubmit}>
        <input type="text" placeholder="Username" name="name" id="name" />
        <input type="email" placeholder="E-mail" name="email" id="email" />
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
        />
        <button type="submit">Register</button>
      </form>

      <a className="landing-page__button" onClick={handleLoginClick}>
        Login
      </a>
    </div>
  );
}

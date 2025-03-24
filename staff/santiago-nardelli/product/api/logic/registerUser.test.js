import { registerUser } from "./registerUser.js";
import { data } from "../data/index.js";

console.info("TEST registerUser");

data.connect("mongodb://localhost:27017", "test")
.then(() => {
  try {

    return registerUser("Dibu Martinez", "dubu@idolo.com", "123456")
      .then(result=> console.assert(result === undefined, "should not return anything"))// ==> debería retornar undefined siempre que se ejecute correctamente el test
  } catch (error) {
    console.error(error);
  }
})
.catch((error) => console.error(error))
.finally(() => data.disconnect());

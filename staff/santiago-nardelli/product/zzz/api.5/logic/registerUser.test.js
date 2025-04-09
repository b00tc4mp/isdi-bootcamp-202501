import 'dotenv/config'
import { registerUser } from "./registerUser.js";
import { data } from "../data/index.js";

console.info("TEST registerUser");
const { URL_MONGO, DB_NAME } = process.env;
data.connect(URL_MONGO, DB_NAME)
.then(() => {
  try {

    return registerUser("Lio Messi", "lio@messi.com", "123123123")
      .then(result=> console.assert(result === undefined, "should not return anything"))// ==> debería retornar undefined siempre que se ejecute correctamente el test
  } catch (error) {
    console.error(error);
  }
})
.catch((error) => console.error(error))
.finally(() => data.disconnect());

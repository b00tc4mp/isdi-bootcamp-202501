import 'dotenv/config'
import {registerUser} from './registerUser.js'
import {connectToDatabase, disconnectFromDatabase} from '../../../../lib/db/index.js'

const { DATABASE_URL, DATABASE_NAME } = process.env;
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("DATABASE_NAME:", process.env.DATABASE_NAME);
console.info("TEST registerUser");

connectToDatabase(DATABASE_URL, DATABASE_NAME)
.then(() => {
  try {

    return registerUser("Lio Messi", "lio@messi.com", "123123123")
      .then(result=> console.assert(result === undefined, "should not return anything"))// ==> debería retornar undefined siempre que se ejecute correctamente el test
  } catch (error) {
    console.error(error);
  }
})
.catch((error) => console.error(error))
.finally(() => disconnectFromDatabase());

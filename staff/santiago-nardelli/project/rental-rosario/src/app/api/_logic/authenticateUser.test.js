import { authenticateUser } from "./authenticateUser.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../lib/db/index.js";
const { DATABASE_URL, DATABASE_NAME } = process.env;
console.info("TEST athenticateUser");

connectToDatabase(DATABASE_URL, DATABASE_NAME)
  .then(() => {
    try {
      return authenticateUser('diego@maradona.com', "123123123")
      .then((result) =>{
        console.assert(result !== undefined, 'result is not undefined')
        console.assert(result.id === '67fe1765de6d83bce6a1e7f5', 'id is the Diego ')
        console.assert(result.role === 'admin', 'is admin')
      })
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => disconnectFromDatabase());
//node --env-file=.env .\src\app\api\admins\auth\route.js
//node --env-file=.env --inspect-brk .\src\app\api\_logic\authenticateUser.test.js
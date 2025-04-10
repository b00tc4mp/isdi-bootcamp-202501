// Ruta de autenticación
import dotenv from "dotenv";
import { logic } from "../logic";
import { withErrorHandling, jsonBodyParser } from "../handlers/index.js";
import jwt from "jsonwebtoken";
dotenv.config();
const { JWT_SECRET } = process.env;



export const POST_AUTH = withErrorHandling((req) => {
  return jsonBodyParser(req)
    .then(({ username, password }) =>
      logic.authenticateUser(username, password)
    )
    .then((userId) => {
      const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "1h" });
      return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
});

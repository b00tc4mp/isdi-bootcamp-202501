import { registerUser } from "./registerUser.js";
import { connectToDatabase, disconnectFromDatabase } from "../../../lib/db/index.js";

const { DATABASE_URL, DATABASE_NAME } = process.env;

(async () => {
  console.info("TEST registerUser");

  try {
    // Conectar a la base de datos
    await connectToDatabase(DATABASE_URL, DATABASE_NAME);

    // Ejecutar la prueba
    const result = await registerUser("Lio Messi", "lio@messi.com", "123123123");

    // Verificar resultados
    console.assert(result !== undefined, "Result is undefined");
    console.assert(result.name === "Lio Messi", "Name mismatch");
    console.assert(result.email === "lio@messi.com", "Email mismatch");
    console.assert(result.role === "user", "Role mismatch");

    console.info("Test passed:", result);
  } catch (error) {
    // Manejo de errores
    console.error("Test failed:", error.message);
  } finally {
    // Desconectar de la base de datos
    await disconnectFromDatabase();
    console.info("Disconnected from database");
  }
})();

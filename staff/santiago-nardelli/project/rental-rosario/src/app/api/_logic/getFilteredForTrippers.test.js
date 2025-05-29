import "dotenv/config";
import { getFilteredForTrippers } from "./getFilteredForTrippers.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../lib/db/index.js";

console.log("TEST getFilteredForTrippers");

// Datos de prueba
const testFilters = [
  { travelers: "all" },
  { travelers: "2" },
  { travelers: "10" },
  {}, // Sin filtros
];

(async () => {
  try {
    // Conexión a la base de datos
    await connectToDatabase(
      process.env.DATABASE_URL,
      process.env.DATABASE_NAME
    );

    for (const filter of testFilters) {
      try {
        console.log(`Testing with filter: ${JSON.stringify(filter)}`);
        const result = await getFilteredForTrippers(filter);

        // Validar resultados
        console.assert(Array.isArray(result), "Result should be an array");
        console.assert(
          result.length > 0 || filter.travelers === undefined,
          "Result should have at least one property if no specific filter"
        );

        console.log("Result:", result);
      } catch (error) {
        if (error instanceof NotFoundError) {
          console.warn(`NotFoundError: ${error.message}`);
        } else {
          console.error(`Unexpected error: ${error.message}`);
        }
      }
    }
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  } finally {
    // Desconexión de la base de datos
    await disconnectFromDatabase();
    console.log("Database connection closed");
  }
})();

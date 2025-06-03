import { connectToDatabase } from "../../../lib/db/index.js";
import { withErrorHandling } from "../../../lib/handlers/withErrorHandling.js";
import { authMiddleware } from "../../../lib/middleware/authMiddleware.js";
import { createProperty, getAllProperties } from "../_logic/index.js";

export async function GET(req) {
  const res = Response;

  return await withErrorHandling(async (req, res) => {
    await connectToDatabase();

    // Lógica para obtener todas las propiedades
    const properties = await getAllProperties();

    // Responder con éxito
    return res.json(properties);
  })(req, res);
}
export async function POST(req) {
  const res = Response;

  return await withErrorHandling(
    authMiddleware(async (req, res) => {
      await connectToDatabase();

      const propertyData = await req.json();

      // Crear la propiedad en la base de datos
      await createProperty(propertyData);

      // Responder con éxito
      return new res(null, { status: 201 });
    })
  )(req, res);
}

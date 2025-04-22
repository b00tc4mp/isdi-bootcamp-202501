import { connectToDatabase } from "../../../../lib/db/index.js";
import { authMiddleware } from "../../../../lib/middleware/authMiddleware.js";
import { withErrorHandling } from "../../../../lib/handlers/withErrorHandling.js";
import { updateProperty, deleteProperty } from "../../_logic/index.js";
export async function PATCH(req, { params }) {
  const res = Response;

  return await withErrorHandling(
    authMiddleware(async (req, res, params) => {
      await connectToDatabase();
      const { id } = await req.user;
      const { propertyId } = await params;
      const { property } = await req.json();

      //actualizar propiedad
      await updateProperty(id, propertyId, property);

      // Responder con éxito
      return new res(null);
    })
  )(req, res, params);
}

export async function DELETE(req, { params }) {
  const res = Response;

  return await withErrorHandling(
    authMiddleware(async (req, res, params) => {
      await connectToDatabase();

      const { id } = await req.user;
      const { propertyId } = await params;

      //actualizar propiedad
      await deleteProperty(id, propertyId);

      // Responder con éxito
      return new res(null);
    })
  )(req, res, params);
}

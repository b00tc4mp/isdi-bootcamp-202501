import { connectToDatabase } from "../../../../lib/db/index.js";
import { authMiddleware } from "../../../../lib/middleware/authMiddleware.js";
import { withErrorHandling } from "../../../../lib/handlers/withErrorHandling.js";
import {
  updateProperty,
  deleteProperty,
  getOneProperty,
} from "../../_logic/index.js";

export async function GET(req, { params }) {
  const res = Response;

  return await withErrorHandling(async (req, res, params) => {
    await connectToDatabase();

    const { propertyId } = await params;

    // Lógica para obtener todas las propiedades
    const propertie = await getOneProperty(propertyId);

    // Responder con éxito
    return res.json(propertie);
  })(req, res, params);
}
export async function PATCH(req, { params }) {
  const res = Response;

  return await withErrorHandling(
    authMiddleware(async (req, res, params) => {
      await connectToDatabase();
      const { id } = await req.user;
      const { propertyId } = await params;
      const updates = await req.json();

      //actualizar propiedad
      await updateProperty(id, propertyId, updates);

      // Responder con éxito
      return new res(null, { status: 204 });
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

{
  /**
  // src/app/api/properties/[propertyId]/route.js
import { NextResponse } from 'next/server'; // Importa NextResponse
import { updateProperty } from '../../_logic/updateProperties'; // Asegúrate de la ruta correcta
import authMiddleware from '@/lib/middleware/authMiddleware'; // Asumiendo que tienes un middleware de autenticación
import withErrorHandling from '@/lib/handlers/withErrorHandling'; // Asumiendo que tienes un manejador de errores
import connectToDatabase from '@/lib/db/connectToDatabase'; // Importa tu función de conexión a la base de datos

export async function PATCH(req, { params }) {
  // La línea 'const res = Response;' es innecesaria.
  // Debes usar NextResponse para crear respuestas en las rutas de la API de Next.js.

  return await withErrorHandling(
    authMiddleware(async (req, res, params) => {
      await connectToDatabase();
      // Obtener el ID del usuario desde req.user (asumiendo que authMiddleware lo adjunta)
      const { id: userId } = req.user; // Renombramos 'id' a 'userId' para mayor claridad

      // Obtener el propertyId de los parámetros de la URL
      const { propertyId } = params; // Ya es un objeto, no necesitas 'await'

      // Obtener los datos de la propiedad del cuerpo de la solicitud
      const property = await req.json(); // Correcto, obtienes el cuerpo como JSON

      // Llamar a tu función updateProperty
      await updateProperty(userId, propertyId, property);

      // Responder con éxito (204 No Content es una buena práctica para PATCH exitoso sin cuerpo de respuesta)
      return new NextResponse(null, { status: 204 }); // Usa NextResponse aquí
    })
  )(req, { params }); // Pasa 'params' correctamente aquí
}
  
  */
}

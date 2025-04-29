import { connectToDatabase } from "../../../../lib/db/index.js";
import { withErrorHandling } from "../../../../lib/handlers/withErrorHandling.js";
import { getAllProperties } from "../../_logic/index.js";
export async function GET(req) {
  const res = Response;

  return await withErrorHandling(async (req, res) => {
    await connectToDatabase();

    const { searchParams } = req.nextUrl;
    const type = searchParams.get("type");
    const bedrooms = searchParams.get("bedrooms");
    const location = searchParams.get("location");

    const allProperties = await getAllProperties();

    // Filtrar las propiedades basadas en los parámetros de consulta
    const filteredProperties = allProperties.filter((property) => {
      const typeMatch =
        !type || property.type?.toLowerCase().includes(type.toLowerCase());
      const bedroomsMatch =
        !bedrooms || property.bedrooms === parseInt(bedrooms);
      const locationMatch =
        !location ||
        property.location?.toLowerCase().includes(location.toLowerCase());
      return typeMatch && bedroomsMatch && locationMatch;
    });

    // Responder con éxito con las propiedades filtradas
    return res.json(filteredProperties);
  })(req, res);
}

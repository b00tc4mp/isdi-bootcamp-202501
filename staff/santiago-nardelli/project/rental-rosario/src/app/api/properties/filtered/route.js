import { connectToDatabase } from "../../../../lib/db/index.js";
import { withErrorHandling } from "../../../../lib/handlers/withErrorHandling.js";
import { getFilteredProperties } from "../../_logic/index.js";
export async function GET(req) {
  const res = Response;

  return await withErrorHandling(async (req, res) => {
    await connectToDatabase();

    const { searchParams } = req.nextUrl;
    const type = searchParams.get("type");
    const bedrooms = searchParams.get("bedrooms");

    const filter = { type, bedrooms };
    const filteredProperties = await getFilteredProperties(filter);

    // Responder con éxito con las propiedades filtradas
    return res.json(filteredProperties);
  })(req, res);
}

import { connectToDatabase } from "../../../../lib/db/index.js";
import { withErrorHandling } from "../../../../lib/handlers/withErrorHandling.js";
import { getFilteredForTrippers } from "../../_logic/index.js";
export async function GET(req) {
  const res = Response;

  return await withErrorHandling(async (req, res) => {
    await connectToDatabase();

    const { searchParams } = req.nextUrl;

    const travelers = searchParams.get("travelers");

    const filter = { travelers };
    const filteredProperties = await getFilteredForTrippers(filter);

    // Responder con éxito con las propiedades filtradas
    return res.json(filteredProperties);
  })(req, res);
}

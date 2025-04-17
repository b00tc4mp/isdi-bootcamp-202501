import { connectToDatabase } from "../../../lib/db/index.js";
import { withErrorHandling } from "../../../lib/handlers/index.js";

export async function GET(req) {
  await connectToDatabase();

  const res = Response;

  return await withErrorHandling(async (req, res) => {
    //throw new Error('forced error')
    return res.json({ message: "Hello World" });
  })(req, res);
}

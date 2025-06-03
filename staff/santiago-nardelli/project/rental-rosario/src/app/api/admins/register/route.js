import { connectToDatabase } from "../../../../lib/db/index.js";
import { registerUser } from "../../_logic/registerUser.js";
import { withErrorHandling } from "../../../../lib/handlers/withErrorHandling.js";

export async function POST(req) {
  await connectToDatabase();

  const res = Response;

  return await withErrorHandling(async (req, res) => {
    const { name, email, password } = await req.json();

    // Logica de registro
    await registerUser(name, email, password);

    return new res(null, { status: 201 });
  })(req, res);
}

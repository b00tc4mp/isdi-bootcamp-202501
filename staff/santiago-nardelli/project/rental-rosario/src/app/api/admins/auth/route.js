import { authenticateUser } from "../../_logic/authenticateUser.js";
import { connectToDatabase } from "../../../../lib/db/index.js";
import { withErrorHandling } from "../../../../lib/handlers/index.js";
import { createToken } from "../../../../lib/utils/createToken.js";

export async function POST(req) {
  await connectToDatabase();

  const res = Response;
  return await withErrorHandling(async (req, res) => {
    const { email, password } = await req.json();

    // Autenticar al usuario
    const user = await authenticateUser(email, password);

    // Generar el token JWT utilizando createToken
    const token = createToken(user.id, user.role);

    // Responder con éxito
    return res.json(
      token
    );
  })(req, res);
}

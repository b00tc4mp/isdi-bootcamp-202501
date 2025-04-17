import { authenticateUser } from '../../_logic/authenticateUser.js';
import { connectToDatabase} from '../../../../lib/db/index.js';
import { withErrorHandling } from '../../../../lib/handlers/index.js';
import jwt from 'jsonwebtoken'



export async function POST(req) {
  debugger
  await connectToDatabase();

  const res = Response

  return await withErrorHandling(async (req, res) => {
      const {email, password} = await req.json();


    // Lógica de autenticación
    const user = await authenticateUser(email, password);

     // Generar el token JWT con id y role
     const token = jwt.sign({ id: user.id, role: user.role }, // Payload
     process.env.JWT_SECRET, // Clave secreta
      { expiresIn: '1h' } // Tiempo de expiración
    );

    // Responder con éxito
    return res.json({token})
  })(req, res)
}

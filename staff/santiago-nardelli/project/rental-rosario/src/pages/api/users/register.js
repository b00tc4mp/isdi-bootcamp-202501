// Ruta de registro
import dotenv from 'dotenv'
import { logic } from '../logic';
import {withErrorHandling, jsonBodyParser} from '../handlers/index.js'
dotenv.config()

export const POST = withErrorHandling((req) => {
  return jsonBodyParser(req)
    .then(({ name, email, username, password }) => 
      logic.registerUser(name, email, username, password)
    )
    .then(() => new Response(null, { status: 201 }))
})
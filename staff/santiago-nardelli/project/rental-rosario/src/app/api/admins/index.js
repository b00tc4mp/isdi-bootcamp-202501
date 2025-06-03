import { loginUser } from './auth/route.js';
import { registerUser } from './register/route.js'; 

export const loginAndRegister={loginUser, registerUser};
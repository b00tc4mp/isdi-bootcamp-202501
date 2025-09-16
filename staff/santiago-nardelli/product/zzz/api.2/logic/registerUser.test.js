import { registerUser } from "./registerUser.js";

try {
  const newUser = registerUser('Lautaro', 'toro@martinez.com', '123456') 
  console.log(newUser);
} catch (error) {
  console.error(error);
  
}
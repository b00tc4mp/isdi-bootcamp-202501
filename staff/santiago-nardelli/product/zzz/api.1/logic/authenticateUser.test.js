import { authenticateUser } from './authenticateUser.js';


try{
  const user = authenticateUser('test@test.com', 'test');
  console.log(user);
}catch(error){  
  console.error(error);

  

};

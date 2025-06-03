import { registerUser } from "@/lib/logic/functions/registerUser";
const testRegisterUser = async () => {
  const formData = new FormData();
  formData.append('username', 'testuser');
  formData.append('email', 'testuser@example.com');
  formData.append('password', 'password123');
  formData.append('confirmPassword', 'password123');

  try {
    const result = await registerUser(formData);
    console.log('Test passed:', result);
  } catch (error) {
    console.error('Test failed:', error.message);
  }
};

testRegisterUser();
'use server';

import { connectToDatabase } from '@/lib/db';
//import User from '@/lib/db/models/User';
//import bcrypt from 'bcrypt';

export const loginUser = async (formData) => {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    // Validaciones
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('El email no es válido.');
    }
    if (!password) {
      throw new Error('Se requiere la contraseña.');
    }

    // Conectar a la base de datos
    await connectToDatabase();

    // Verificar el usuario
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Usuario no encontrado.');
    }

    // Comparar contraseñas
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('La contraseña es incorrecta.');
    }

    return { message: 'Login exitoso.', user: { id: user._id, username: user.username, email: user.email } };
  } catch (error) {
    console.error('Error en el login:', error.message);
    throw error;
  }
};
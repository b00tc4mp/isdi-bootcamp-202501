'use client'
import { fetchRegisterUser } from '@/app/_logic/index.js'
import Link from 'next/link'
import { useState } from 'react';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    setLoading(true); // Set loading to true
    setError(null);   // Reset any previous errors

    try {
      const user = await fetchRegisterUser(formData);
      console.debug('User registered:', user);

      // Limpiar los campos del formulario
      event.target.reset();

      alert('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
      setError(error.message); // Set error message
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-3xl font-bold underline mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
          name="username"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
          name="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
          name="password"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
          name="confirmPassword"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error */}
      </form>
      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
      </p>
    </div>
  );
}

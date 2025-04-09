export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-3xl font-bold underline mb-4">Register</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Register
        </button>
      </form>
      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </a>
      </p>
    </div>
  );
}

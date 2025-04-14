export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl text-center font-bold underline mb-4">Login</h1>
      <form className="bg-white  shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </form>
      <p className="text-center text-gray-600">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-500 hover:text-blue-700">
          Register
        </a>
      </p>
      <p className="text-center text-gray-600">
        Forgot your password?{" "}
        <a
          href="/forgot-password"
          className="text-blue-500 hover:text-blue-700"
        >
          Reset Password
        </a>
      </p>
    </div>
  );
}

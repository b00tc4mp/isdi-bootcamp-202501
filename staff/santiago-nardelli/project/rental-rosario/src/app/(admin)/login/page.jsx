"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLoginUser } from "../../hooks/useLoginUser.js";
import { useRouter } from "next/navigation";
import { isUserLoggedIn } from "../../_logic/functions/isUserLoggedIn.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useLoginUser();

  const router = useRouter();

  useEffect(() => {
    if (isUserLoggedIn()) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginSuccessful = await login(email, password);
    if (loginSuccessful) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Link href="/register" className="text-blue-500 mt-4">
        Don't have an account? Register here.
      </Link>
    </div>
  );
};

export default LoginPage;

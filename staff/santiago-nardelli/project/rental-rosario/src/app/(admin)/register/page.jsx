"use client";
import React from "react";
import { useRegisterUser } from "../../hooks/useRegisterUser.js";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { registerUser, error, loading, success } = useRegisterUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const registrationSuccessful = await registerUser(name, email, password);

    if (registrationSuccessful) {
      router.push("/login");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>User registered successfully!</p>
      )}
    </div>
  );
}

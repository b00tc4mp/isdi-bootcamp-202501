"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLoginUser } from "../../hooks/useLoginUser.js";
import { useRouter } from "next/navigation";
import { isUserLoggedIn } from "../../_logic/functions/isUserLoggedIn.js";
import GenericForm from "../../_components/molecules/GenericForm.jsx";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const LoginPage = () => {
  const { login, error, loading, success } = useLoginUser();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoggedIn()) {
      router.push("/dashboard");
    }
  }, [router]);

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Inicio de sesión exitoso.",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/dashboard");
      });
    }

    if (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: error,
        confirmButtonText: "OK",
      });
    }
  }, [success, error, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    await login(email, password);
  };

  const formFields = [
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Password", name: "password", type: "password", required: true },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <GenericForm
          fields={formFields}
          onSubmit={handleSubmit}
          loading={loading}
          submitButtonText={loading ? "Logging in..." : "Login"}
          buttonClassName="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          className="space-y-4"
          error={null}
        />
        <p className="text-center text-gray-500 text-xs mt-4">
          Don't have an account?{" "}
          {/* <Link href="/register" className="text-blue-500 hover:text-blue-800">
            Register here.
          </Link> */}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

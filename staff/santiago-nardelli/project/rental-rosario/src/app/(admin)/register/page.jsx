"use client";
import React from "react";
import { useRegisterUser } from "../../hooks/useRegisterUser.js";
import { useRouter } from "next/navigation";
import GenericForm from "../../_components/molecules/GenericForm.jsx";
import { useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Link from "next/link";
import { isUserLoggedIn } from "../../_logic/functions/isUserLoggedIn.js";

export default function RegisterForm() {
  const { registerUser, error, loading, success } = useRegisterUser();
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
        text: "Usuario registrado correctamente.",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/login");
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

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Las contraseñas no coinciden.",
        confirmButtonText: "OK",
      });
      return;
    }

    await registerUser(name, email, password);
  };
  const formFields = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Password", name: "password", type: "password", required: true },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      required: true,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <GenericForm
          fields={formFields}
          onSubmit={handleSubmit}
          loading={loading}
          buttonClassName="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          submitButtonText="Register"
        />
        {/* Enlace para usuarios ya registrados */}
        <p className="text-center text-gray-500 text-xs mt-4">
          Already logged in?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

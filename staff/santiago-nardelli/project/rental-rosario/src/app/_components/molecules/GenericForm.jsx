// src/app/_components/ui/GenericForm.jsx
"use client";

import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const GenericForm = ({
  title,
  fields, // Array de objetos que definen cada campo
  onSubmit, // Función que se llama al enviar el formulario
  submitButtonText,
  className, // Clases CSS adicionales para el formulario
  buttonClassName, // Clases CSS adicionales para el botón
  error, // Propiedad para mostrar un error general del formulario
  loading, // Propiedad para indicar el estado de carga
  children, // Propiedad para renderizar elementos adicionales dentro del formulario
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <div className="grid gap-4">
        {fields &&
          fields.map((field) => (
            <div key={field.name} className="grid gap-2">
              {field.label && <Label htmlFor={field.name}>{field.label}</Label>}
              <Input
                type={field.type || "text"}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder || ""}
                required={field.required || false}
                defaultValue={field.defaultValue || ""}
                {...field.rest} // Permite pasar otras props específicas al Input
              />
            </div>
          ))}
        {children}{" "}
        {/* Renderiza cualquier elemento hijo pasado al componente */}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        <Button
          type="submit"
          className={buttonClassName || "w-full"}
          disabled={loading}
        >
          {loading ? "Processing..." : submitButtonText || "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default GenericForm;

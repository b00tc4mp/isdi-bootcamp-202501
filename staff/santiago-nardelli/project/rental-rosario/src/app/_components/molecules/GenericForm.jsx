// src/app/_components/ui/GenericForm.jsx
"use client";

import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

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
              {field.type === "select" ? (
                <Select
                  name={field.name} // Importante para la sumisión del formulario
                  onValueChange={(value) => {
                    console.log(
                      `Valor seleccionado para ${field.name}: ${value}`
                    );
                  }}
                  defaultValue={field.defaultValue}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Selecciona un ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder || ""}
                  required={field.required || false}
                  defaultValue={field.defaultValue || ""}
                ></textarea>
              ) : (
                <Input
                  type={field.type || "text"}
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder || ""}
                  required={field.required || false}
                  defaultValue={field.defaultValue || ""}
                  {...field.rest}
                />
              )}
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

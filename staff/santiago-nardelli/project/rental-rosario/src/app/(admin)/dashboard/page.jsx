"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa el enrutador de Next.js


export default function Dashboard() {
  const [selectedOption, setSelectedOption] = useState("view");
  const router = useRouter(); // Inicializa el enrutador

  const handleNavigation = (path) => {
    // Aquí puedes agregar lógica adicional antes de navegar
    console.log(`Navegando a: ${path}`);
    router.push(path); // Navegación programática con el enrutador de Next.js
  };
  const renderContent = () => {
    switch (selectedOption) {
      case "view":
        return <div>Lista de propiedades</div>;
      case "create":
        return <div>Formulario para crear una nueva propiedad</div>;
      case "edit":
        return <div>Formulario para editar una propiedad existente</div>;
      case "delete":
        return <div>Confirmación para eliminar una propiedad</div>;
      default:
        return <div>Opción no válida</div>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: "250px",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1</div>)",
        }}
      >
        <h2>Dashboard</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            style={{
              margin: "10px 0",
              cursor: "pointer",
              color: selectedOption === "view" ? "blue" : "black",
            }}
            onClick={() => setSelectedOption("view")}
          >
            Ver propiedades
          </li>
          <li
            style={{
              margin: "10px 0",
              cursor: "pointer",
              color: selectedOption === "create" ? "blue" : "black",
            }}
            onClick={() => setSelectedOption("create")}
          >
            Crear propiedad
          </li>
          <li
            style={{
              margin: "10px 0",
              cursor: "pointer",
              color: selectedOption === "edit" ? "blue" : "black",
            }}
            onClick={() => setSelectedOption("edit")}
          >
            Editar propiedad
          </li>
          <li
            style={{
              margin: "10px 0",
              cursor: "pointer",
              color: selectedOption === "delete" ? "blue" : "black",
            }}
            onClick={() => setSelectedOption("delete")}
          >
            Eliminar propiedad
          </li>
          <li
            style={{ margin: "10px 0", cursor: "pointer" }}
            onClick={() => handleNavigation("/")}
          >
            <span style={{ color: "black", textDecoration: "none" }}>
              Ir a inicio
            </span>
          </li>
        </ul>
      </aside>
      <main style={{ flex: 1, padding: "20px" }}>{renderContent()}</main>
    </div>
  );
}

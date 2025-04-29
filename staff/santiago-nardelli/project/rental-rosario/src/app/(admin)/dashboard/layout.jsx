// src/app/(admin)/layout.jsx
import Link from "next/link";

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <aside className="w-1/5 bg-gray-800 p-4 sm:w-64">
        <nav className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Propiedades Managment
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard/add-property"
                  className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
                >
                  Agregar Propiedad
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/edit-product"
                  className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
                >
                  Modificar Propiedad
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/delete-product"
                  className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
                >
                  Eliminar Propiedad
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-400 uppercase tracking-wider mb-2">
              General
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
                >
                  Volver a la Página Principal
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-6 sm:p-8">{children}</main>
    </div>
  );
}

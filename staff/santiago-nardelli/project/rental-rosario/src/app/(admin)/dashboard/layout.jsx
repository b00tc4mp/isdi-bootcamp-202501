import Link from 'next/link';
export default function AdminDashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '20%', backgroundColor: '#f4f4f4', padding: '1rem' }}>
        <nav>
          <ul>
            <li><Link href="/admin/dashboard/add-product">Agregar Producto</Link></li>
            <li><Link href="/admin/dashboard/edit-product">Modificar Producto</Link></li>
            <li><Link href="/admin/dashboard/delete-product">Eliminar Producto</Link></li>
            <li><Link href="/public/home">Volver al Home</Link></li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
}

import Head from "next/head"; // Importa Head de next/head
import Footer from "./_components/molecules/Footer.jsx";
import "./_styles/globals.css";

export const metadata = {
  title: {
    default: "Rental Rosario",
    absolute: "",
    template: "%s | Rental Rosario",
  },
  description:
    "Encuentra las mejores propiedades y experiencias turísticas en Rosario. Alquila casas, apartamentos y estudios en una ciudad vibrante y llena de cultura. ¡Reserva ahora!",
  icons: {
    icon: [
      {
        url: "/images/logo-rental-1.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Head>
        {/* Título para la página (importante para SEO y UX) */}
        <title>{metadata.title.default}</title>

        {/* Meta descripción para los motores de búsqueda */}
        <meta name="description" content={metadata.description} />

        {/* Define el favicon (ícono de la pestaña del navegador) */}
        <link
          rel="icon"
          href="/images/logo-rental-1.png"
          sizes="512x512"
          type="image/png"
        />

        {/* Configuración de vista en dispositivos móviles */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Metaetiquetas relacionadas con el idioma y la región */}
        <meta name="language" content="es" />
        <meta name="geo.region" content="AR-S" />
        <meta name="geo.placename" content="Rosario" />
        <meta name="geo.position" content="-32.94682;-60.63932" />
        <meta name="ICBM" content="-32.94682, -60.63932" />

        {/* Etiqueta para autor */}
        <meta name="author" content="Rental Rosario Team" />

        {/* Palabras clave para motores de búsqueda */}
        <meta
          name="keywords"
          content="alquiler en Rosario, alquiler temporal, propiedades Rosario, experiencias Rosario, turismo Rosario"
        />

        {/* Atributos de robots para indexación y seguimiento */}
        <meta name="robots" content="index, follow" />

        {/* Preconexión para optimizar carga de recursos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}

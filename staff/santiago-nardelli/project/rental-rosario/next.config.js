/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
        pathname: "/im/pictures/**", // Permite todas las rutas que comiencen con /im/pictures/
      },
      // Agrega aquí otros dominios si los encuentras
    ],
  },
};

export default nextConfig;

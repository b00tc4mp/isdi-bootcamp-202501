Dado que Next.js no tiene acceso a archivos remotos durante el proceso de compilación, deberá proporcionar el width, height y opcional blurDataURL accesorios manualmente. El width y height se utilizan para inferir la relación de aspecto correcta de la imagen y evitar el cambio de diseño desde la carga de la imagen.

Para permitir de forma segura imágenes de servidores remotos, debe definir una lista de patrones de URL compatibles en next.config.js. Sea lo más específico posible para evitar el uso malicioso. Por ejemplo, la siguiente configuración solo permitirá imágenes de un bucket específico de AWS S3:

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
        search: '',
      },
    ],
  },
}
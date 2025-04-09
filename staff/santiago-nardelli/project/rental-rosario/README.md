This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# Proyecto de Alquileres Temporales en Rosario

## Descripción

Este proyecto consiste en una página web para la búsqueda y gestión de alquileres temporales en la ciudad de Rosario, Argentina. Los usuarios podrán buscar propiedades en el mapa de la ciudad, aplicar filtros, y ver detalles de cada propiedad. Además, los administradores podrán gestionar las propiedades a través de un panel de administración, con funcionalidades de agregar, editar y eliminar propiedades.

## Tecnologías Utilizadas

- **Frontend**: 
  - Next.js (React)
  - Leaflet (para el mapa interactivo)
  - CSS/Tailwind (para el diseño de la interfaz)

- **Backend**:
  - Express.js (servidor web)
  - MongoDB (base de datos NoSQL)
  - Mongoose (ODM para MongoDB)
  
- **Autenticación**:
  - JWT (JSON Web Tokens) para la autenticación de usuarios y administradores

## Arquitectura del Proyecto

El proyecto está basado en una arquitectura de **separación en capas**. Las capas son las siguientes:

1. **Frontend**: 
   - La interfaz de usuario está construida en Next.js, que permite la creación de páginas tanto del lado del cliente como del servidor.
   
2. **Backend**:
   - **API RESTful**: La API se maneja con Express.js y proporciona las rutas necesarias para la interacción entre el cliente y la base de datos.
   
3. **Base de Datos**:
   - MongoDB almacena los datos de las propiedades, usuarios y administradores.
   - Mongoose se utiliza para la definición de esquemas y la interacción con MongoDB.

4. **Autenticación**:
   - Los usuarios y administradores están autenticados usando JWT, permitiendo sesiones seguras para la administración de la plataforma.

## Estructura de la Base de Datos

### Modelos de Datos (Mongoose Schemas)

1. **Propiedad**:
   - `titulo`: String
   - `descripcion`: String
   - `direccion`: String
   - `coordenadas`: {
       latitud: Number,
       longitud: Number
     }
   - `tipo`: String (apartamento, casa, etc.)
   - `caracteristicas`: [String] (ej. piscina, gimnasio, etc.)
   - `precio`: Number
   - `disponibilidad`: Boolean (si la propiedad está disponible para alquilar)
   - `imagenes`: [String] (URLs de imágenes de la propiedad)
   
2. **Usuario**:
   - `nombre`: String
   - `email`: String
   - `contraseña`: String (hash de la contraseña)
   - `rol`: String (usuario o admin)
   - `fechaRegistro`: Date

3. **Reserva**: (a conciderar a futuro)
   - `usuarioId`: ObjectId (referencia al Usuario)
   - `propiedadId`: ObjectId (referencia a Propiedad)
   - `fechaInicio`: Date
   - `fechaFin`: Date
   - `estado`: String (pendiente, confirmada, cancelada)

## Rutas de la API

### Rutas para Propiedades
- `GET /api/propiedades`: Obtener todas las propiedades.
- `GET /api/propiedades/:id`: Obtener detalles de una propiedad específica.
- `POST /api/propiedades`: Crear una nueva propiedad (solo admin).
- `PUT /api/propiedades/:id`: Modificar una propiedad existente (solo admin).
- `DELETE /api/propiedades/:id`: Eliminar una propiedad (solo admin).
  
### Rutas para Usuarios
- `POST /api/usuarios/registro`: Registrar un nuevo usuario.
- `POST /api/usuarios/login`: Iniciar sesión con email y contraseña.

### Rutas para Reservas (a conciderar a futuro)
- `GET /api/reservas`: Obtener todas las reservas de un usuario.
- `POST /api/reservas`: Crear una nueva reserva.
  
### Rutas de Administración
- `GET /api/admin/propiedades`: Obtener todas las propiedades (solo admin).
- `POST /api/admin/propiedades`: Crear propiedad (solo admin).
- `PUT /api/admin/propiedades/:id`: Modificar propiedad (solo admin).
- `DELETE /api/admin/propiedades/:id`: Eliminar propiedad (solo admin).

## Vistas del Frontend

1. **Página de Inicio**: 
   - Muestra un mapa interactivo de Rosario donde los usuarios pueden buscar propiedades al continuo de un slogan("Encuentra tu espacio perfecto en Rosario, ¡alójate hoy!"), buscamos una pagina de inicio llamativa e interactiva
   - Filtros de búsqueda: tipo de propiedad, características, rango de precio.
   - Listado de propiedades formato cards(productos)

2. **Página de Detalles de Propiedad**:
   - Al hacer clic en una propiedad en el mapa o en las tarjetas, se abre una vista con los detalles completos de la propiedad.

3. **Página de Registro/Inicio de sesión**:
   - Formulario de registro para nuevos usuarios.
   - Formulario de inicio de sesión para usuarios existentes.

4. **Dashboard de Administrador**:
   - Solo accesible por administradores.
   - Se pueden agregar, editar y eliminar propiedades.
   - Visualización de todas las propiedades con opciones de gestión.

## Funciones Principales

1. **Interacción con el Mapa**:
   - Los usuarios pueden moverse por el mapa de Rosario para encontrar propiedades en diferentes ubicaciones.
   
2. **Filtros de Búsqueda**:
   - Los filtros permiten seleccionar el tipo de propiedad, las características (piscina, gimnasio, etc.) y el rango de precio.
   
3. **Registro e Inicio de Sesión**:
   - Los usuarios pueden registrarse y luego iniciar sesión para ver las propiedades y realizar reservas.
   - Los administradores tienen acceso a un panel de administración para gestionar las propiedades.

4. **Panel de Administración**:
   - Solo accesible por administradores.
   - Permite agregar, editar o eliminar propiedades.

5. **Sistema de Reservas**:
   - Los usuarios pueden realizar reservas de propiedades disponibles.(a considerar a futuro)
   
## Configuración de la API

1. **Instalación de dependencias**:
   ```sh
   npx create-next-app@latest
   npm install express mongoose dotenv jsonwebtoken bcryptjs

   ```


## Separacion de componentes SSR // CSR

### SSR (Server-Side-Components)

1. **Pagina de Inicio**:
   - La página de inicio puede mostrar una lista de propiedades destacadas que puedes obtener directamente desde tu base de datos al momento de cargar la página. Esto es ideal para SSR, ya que los usuarios pueden ver las propiedades de inmediato sin esperar a que se cargue el contenido dinámicamente.

2. **Pagina de deatlle de propiedad**
   -Pagina con informacion descriptiva de la propiedad(Imagenes/detalle/link de redireccion a Arbnb)


### CSR (Client-Side-Render) utilizando dynamic de Next.js con { ssr: false }. leyenda use client

1. **Mapa interactivo**:(A conciderar)

   - Mapa interactivo (con Leaflet o Mapbox) : El mapa es una funcionalidad interactiva que depende de la ubicación geográfica del usuario y la visualización dinámica de propiedades en el mapa. Este tipo de componentes interactivos generalmente no necesitan ser renderizados del lado del servidor porque el contenido se genera dinámicamente en función de las acciones del usuario (movimiento del mapa, selección de áreas, filtrado de propiedades). Cargar el componente del mapa solo en el cliente, usando algo como dynamic de Next.js con la opción { ssr: false } para evitar que se renderice en el servidor.

2. **Filtro de busqueda**:

   - Si los filtros de búsqueda son altamente interactivos y requieren que se actualicen de manera dinámica sin necesidad de recargar la página o hacer una nueva solicitud al servidor (por ejemplo, filtrando las propiedades según el precio, las características, etc.), entonces estos podrían ser más eficientes si se manejan solo en el cliente.

   - Solución: Puedes cargar los filtros en el cliente y usar estado local para gestionar los cambios y hacer solicitudes a la API para obtener resultados filtrados sin necesidad de una renderización en el servidor.

3. **Detalle de propiedad**

   - Si los detalles de las propiedades incluyen imágenes, videos o datos cargados de manera asíncrona (como información que proviene de una API o base de datos), es más eficiente renderizarlos del lado del cliente después de la primera carga inicial.


4. **Autenticacion de User y Gestion de estado (Rol Admin/User)**

   - Los estados de autenticación y el rol del usuario pueden cambiar dinámicamente en función de las interacciones del usuario (como iniciar sesión o registrarse). Este proceso es mejor gestionado en el cliente, ya que no necesitas hacer un renderizado en el servidor para saber si el usuario está autenticado o no.

   - Solución: Puedes almacenar la información del usuario en un contexto de React o en el estado global, y hacer que las peticiones a la API para obtener o actualizar datos se realicen solo del lado del cliente.
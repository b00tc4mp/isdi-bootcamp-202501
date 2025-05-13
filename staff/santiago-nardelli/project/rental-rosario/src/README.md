# Proyecto de Alquileres Temporales en Rosario

## Índice

1. [Descripción](#descripción)
2. [Casos de Uso](#casos-de-uso)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
5. [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)
6. [Rutas de la API](#rutas-de-la-api)
7. [Vistas del Frontend](#vistas-del-frontend)
8. [Funciones Principales](#funciones-principales)
9. [Configuración de la API](#configuración-de-la-api)
10. [Contribuciones](#contribuciones)
11. [Figma](#figma)
12. [Coverage](#coverage)
13. [Licencia](#licencia)

---

## Descripción

Este proyecto consiste en una página web para la búsqueda y gestión de alquileres temporales en la ciudad de Rosario, Argentina. Los usuarios podrán buscar propiedades en el mapa de la ciudad, aplicar filtros, y ver detalles de cada propiedad. Además, los administradores tendrán acceso a un panel de administración para gestionar las propiedades (agregar, editar y eliminar).

---

## Casos de Uso

### 1. Registro de Usuario

**Objetivo:** Permitir que nuevos admins se registren en la plataforma.

**Flujo:**

- El admin accede a la página de registro.
- Completa un formulario con nombre, correo electrónico y contraseña.
- El sistema valida los datos y crea una nueva cuenta.
- El usuario recibe un mensaje de éxito y es redirigido a la página de inicio de sesión.

### 2. Inicio de Sesión

**Objetivo:** Permitir que los usuarios registrados accedan a la plataforma.

**Flujo:**

- El usuario ingresa sus credenciales en la página de inicio de sesión.
- Si las credenciales son válidas, se redirige a la página principal con acceso completo.

### 3. Recuperación de Contraseña(a futuro)

**Objetivo:** Facilitar el restablecimiento de contraseñas olvidadas.

**Flujo:**

- El usuario solicita restablecer su contraseña.
- El sistema envía un enlace por correo electrónico.
- El usuario crea una nueva contraseña a través del enlace proporcionado.

### 4. Dashboard de Administración

**Objetivo:** Permitir a los administradores gestionar propiedades.

**Funciones:**

- Crear, editar y eliminar propiedades.
- Visualizar la lista completa de propiedades.

### 5. Visualización de Propiedades

**Objetivo:** Ofrecer a los usuarios una experiencia interactiva para buscar y ver propiedades disponibles.

**Flujo:**

- Búsqueda de propiedades mediante filtros dinámicos.
- Visualización de detalles, incluyendo ubicación y características.

---

## Tecnologías Utilizadas

### **Frontend**

- **Next.js** (React Framework)
- **Leaflet** (Mapas interactivos)
- **CSS/Tailwind** (Diseño de interfaz)

### **Backend**

- **MongoDB** (Base de datos NoSQL)
- **Mongoose** (ODM para MongoDB)

### **Autenticación**

- **JWT** (JSON Web Tokens)

---

## Arquitectura del Proyecto

El proyecto sigue una arquitectura en capas con separación clara entre el frontend, backend y base de datos.

### Frontend

- Construido con Next.js, permite renderizado SSR y CSR.

### Backend

- API gestionada mediante las rutas de API de Next.js.

### Base de Datos

- MongoDB almacena datos de propiedades, usuarios y administradores.
- Mongoose facilita la definición de esquemas y consultas.

---

## Estructura de la Base de Datos

### **Propiedad**

```json
{
  "titulo": "Departamento en el centro",
  "descripcion": "Cómodo departamento de 2 habitaciones...",
  "direccion": "Calle Falsa 123",
  "coordenadas": { "latitud": -32.94682, "longitud": -60.63932 },
  "tipo": "Departamento",
  "caracteristicas": ["Piscina", "Gimnasio"],
  "precio": 50000,
  "disponibilidad": true,
  "imagenes": ["url1.jpg", "url2.jpg"]
}
```

### **Usuario**

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "contraseña": "hashed-password",
  "rol": "usuario",
  "fechaRegistro": "2025-04-11"
}
```

---

## Rutas de la API

### **Estructura de Archivos de la API en Next.js**

```
/app
  |-- /api
      |-- /propiedades
          |-- route.js       # Ruta publica que trae las propiedades
          |-- [propertyId]       # Rutas para actualizar y eliminar propiedades
          | -- filtered          # Ruta que me trae propiedades filtreadas por tipo y cantidad de habitaciones
      |-- /admins
          |-- registro.js    # Registro de usuarios
          |-- login.js       # Inicio de sesión
```

### **Propiedades**

- `GET /api/propiedades` - Obtener todas las propiedades.
- `GET /api/propiedades/:id` - Obtener detalles de una propiedad.(a futuro)
- `POST /api/propiedades` - Crear una nueva propiedad (admin).
- `PUT /api/propiedades/:id` - Actualizar una propiedad (admin).
- `DELETE /api/propiedades/:id` - Eliminar una propiedad (admin).

### **Usuarios**

- `POST /api/usuarios/registro` - Registrar un nuevo usuario.
- `POST /api/usuarios/login` - Iniciar sesión.

---

## Vistas del Frontend

### Página de Inicio

- Mapa interactivo con propiedades destacadas.
- Filtros dinámicos para buscar propiedades.

### Página de Detalles de Propiedad(a conciderar)

- Visualización completa de una propiedad seleccionada.

### Página de Registro e Inicio de Sesión

- Formularios para registrar usuarios o iniciar sesión.

### Dashboard de Administración

- Gestión de propiedades (crear, editar, eliminar).

---

## Funciones Principales

1. **Interacción con el Mapa:**

   - Moverse por Rosario y seleccionar propiedades en diferentes ubicaciones.

2. **Filtros de Búsqueda:**

   - Tipo de propiedad y características.

3. **Autenticación:**

   - Registro, inicio de sesión y manejo de roles (usuario y administrador).

4. **Panel de Administración:**
   - Acceso exclusivo para administradores.

---

## Configuración de la API

### **Instalación del Proyecto**

```bash
# Clonar el repositorio
git clone <URL-del-repo>

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

### **Ejecución del Proyecto**

```bash
# Iniciar el servidor
npm run dev
```

---

## Contribuciones

1. Haz un fork del repositorio.
2. Crea una nueva rama: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz un commit: `git commit -m 'Añade nueva funcionalidad'`.
4. Haz un push a tu rama: `git push origin feature/nueva-funcionalidad`.
5. Abre un Pull Request.

---

## Figma

El diseño de la interfaz de usuario del proyecto fue desarrollado utilizando **Figma** para asegurar una experiencia visual atractiva y una navegación intuitiva.

- **Link al prototipo en Figma:** [Diseño del Proyecto en Figma](#)

En el prototipo puedes encontrar:

- **Diseño de la página de inicio.**
- **Panel de administración.**
- **Vista de propiedades.**

## Coverage

Se implementó un análisis de cobertura para evaluar qué partes del código están siendo probadas mediante los tests automáticos.

### Herramientas utilizadas:

- **C8:** Para medir la cobertura de pruebas.

### Generar Reporte de Coverage:

Ejecuta el siguiente comando:

```bash
npm run test-coverage

## Licencia

Este proyecto está bajo la Licencia MIT. Para más información, consulta el archivo LICENSE.
```

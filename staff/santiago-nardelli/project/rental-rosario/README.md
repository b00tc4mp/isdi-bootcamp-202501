# Temporary Rentals Project in Rosario

## Table of Contents

1. [Description](#description)
2. [Use Cases](#use-cases)
3. [Technologies Used](#technologies-used)
4. [Project Architecture](#project-architecture)
5. [Database Structure](#database-structure)
6. [API Routes](#api-routes)
7. [Frontend Views](#frontend-views)
8. [Main Features](#main-features)
9. [API Configuration](#api-configuration)
10. [Contributions](#contributions)
11. [Figma](#figma)
12. [Coverage](#coverage)
13. [License](#license)

---

## Description

This project consists of a web page for searching and managing temporary rentals in the city of Rosario, Argentina. Users can search for properties on the city map, apply filters, and view details for each property. Additionally, administrators will have access to an admin panel to manage properties (add, edit, and delete).

---

## Use Cases

### 1. User Registration

**Objective:** Allow new admins to register on the platform.

**Flow:**

- The admin accesses the registration page.
- Fills out a form with name, email, and password.
- The system validates the data and creates a new account.
- The user receives a success message and is redirected to the login page.

### 2. Login

**Objective:** Allow registered users to access the platform.

**Flow:**

- The user enters their credentials on the login page.
- If the credentials are valid, they are redirected to the main page with full access.

### 3. Password Recovery (Future Implementation)

**Objective:** Facilitate password recovery for forgotten credentials.

**Flow:**

- The user requests a password reset.
- The system sends a link via email.
- The user creates a new password through the provided link.

### 4. Admin Dashboard

**Objective:** Allow administrators to manage properties.

**Features:**

- Create, edit, and delete properties.
- View the complete list of properties.

### 5. Property Visualization

**Objective:** Offer users an interactive experience to search for and view available properties.

**Flow:**

- Search properties using dynamic filters.
- View details, including location and features.

---

## Technologies Used

### **Frontend**

- **Next.js** (React Framework)
- **Leaflet** (Interactive Maps)
- **CSS/Tailwind** (Interface Design)

### **Backend**

- **MongoDB** (NoSQL Database)
- **Mongoose** (ODM for MongoDB)

### **Authentication**

- **JWT** (JSON Web Tokens)

---

## Project Architecture

The project follows a layered architecture with a clear separation between the frontend, backend, and database.

### Frontend

- Built with Next.js, supporting both SSR and CSR rendering.

### Backend

- API managed through Next.js API routes.

### Database

- MongoDB stores property, user, and admin data.
- Mongoose simplifies schema definition and queries.

---

## Database Structure

### **Property**

```json
{
  "title": "Apartment in Downtown",
  "description": "Comfortable 2-bedroom apartment...",
  "address": "123 Fake Street",
  "coordinates": { "latitude": -32.94682, "longitude": -60.63932 },
  "type": "Apartment",
  "features": ["Pool", "Gym"],
  "price": 50000,
  "availability": true,
  "images": ["url1.jpg", "url2.jpg"]
}
```

### **User**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed-password",
  "role": "user",
  "registrationDate": "2025-04-11"
}
```

## API Routes

### **API File Structure in Next.js**

```
/app
  |-- /api
      |-- /properties
          |-- route.js       # Public route to fetch properties
          |-- [propertyId]       # Routes to update and delete properties
          | -- filtered          # Route to fetch properties filtered by type and room count
      |-- /admins
          |-- route.js    # User registration
          |-- route.js       # User login
```

### **Properties**

- `GET /api/properties` -Get all the properties.
- `GET /api/properties/:id` - Get details of a property. (In the future)
- `POST /api/properties` - Create a new property (admin).
- `PUT /api/properties/:id` - Update a property (admin).
- `DELETE /api/properties/:id` - Delete a property (admin).

### **ADMINS**

- `POST /api/admins/register` - Register a new admin.
- `POST /api/admins/auth` - Sign in.

---

## Frontend views

### Home Page

- Interactive map with outstanding properties.
- Dynamic filters to search for properties.

### Property Details page (to be considered)

- Complete display of a selected property.

### Registration and Start of Session page

- Forms to register users or log in.

### Dashboard Administration

- Property management (create, edit, delete).

---

## Main Functions one.

## Principal Funtions

1. **Interactive Map:**

- Move around Rosario and select properties in different locations.

2. **Filter Search:**

- Type of property and characteristics.

3. **Autenticate:**

- Registration, login and role management (user and administrator).

4. **Dahboard:**

- Exclusive access for administrators.

---

## Figma

The project's user interface design was developed using **Figma** to ensure an engaging visual experience and intuitive navigation.

- **Link prototype Figma:** [https://www.figma.com/proto/uQnuU78nSB4RyxQxH68ORU/Home-Rentals-Agency-website-design--Community-?node-id=0-1&t=nPOdbf8EEcP5P20I-1](#)

In the prototype, you can find:

- **Home page layout.**
- **Administration panel.**
- **Properties view.**

## Coverage

A coverage analysis was implemented to assess which parts of the code are being tested by automated tests.

### Tools used:

- **C8:** To measure test coverage.

- **Link to test coverage:** [http://127.0.0.1:5500/rental-rosario/coverage/index.html](#)

### Generate Coverage Report:

Run the following command:

```bash
npm run test-coverage
```

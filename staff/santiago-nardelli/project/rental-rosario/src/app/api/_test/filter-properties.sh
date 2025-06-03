#!/bin/bash

# Define la URL base de tu aplicación (ajusta el puerto si es diferente)
BASE_URL="http://localhost:3000/api/properties/filtered"
CONTENT_TYPE_HEADER="Content-Type: application/json"

# Casos de prueba

echo "--- Prueba sin filtros (debería devolver todas las propiedades) ---"
curl -X GET "$BASE_URL" -H "$CONTENT_TYPE_HEADER" -v

echo "\n--- Prueba filtrando por tipo 'Casa' ---"
curl -X GET "$BASE_URL?type=House" -H "$CONTENT_TYPE_HEADER" -v

echo "\n--- Prueba filtrando por habitaciones '2' ---"
curl -X GET "$BASE_URL?bedrooms=2" -H "$CONTENT_TYPE_HEADER" -v

echo "\n--- Prueba filtrando por ubicación 'Rosario' ---"
curl -X GET "$BASE_URL?location=Rosario" -H "$CONTENT_TYPE_HEADER" -v

echo "\n--- Prueba filtrando por tipo 'Departamento' y habitaciones '1' ---"
curl -X GET "$BASE_URL?type=apartment&bedrooms=1" -H "$CONTENT_TYPE_HEADER" -v

echo "\n--- Prueba filtrando por tipo 'Oficina', habitaciones '3' y ubicación 'Córdoba' ---"
curl -X GET "$BASE_URL?type=apartment&bedrooms=3&location=Rosario" -H "$CONTENT_TYPE_HEADER" -v

echo "\n--- Prueba con parámetros inexistentes (no debería filtrar nada) ---"
curl -X GET "$BASE_URL?precio=100000" -H "$CONTENT_TYPE_HEADER" -v
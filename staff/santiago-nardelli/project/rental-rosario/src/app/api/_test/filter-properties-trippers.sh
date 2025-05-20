#!/bin/bash

# Define la URL base de tu aplicación (ajusta el puerto si es diferente)
BASE_URL="http://localhost:3000/api/properties/filtered"
CONTENT_TYPE_HEADER="Content-Type: application/json"

# Casos de prueba

echo "--- Prueba sin filtros (debería devolver todas las propiedades) ---"
curl -X GET "$BASE_URL" -H "$CONTENT_TYPE_HEADER" -v

echo "\n--- Prueba filtrando por 1 viajero ---"
curl -X GET "$BASE_URL?travelers=1" -H "$CONTENT_TYPE_HEADER" -v

 echo "\n--- Prueba filtrando por 2 viajeros ---"
 curl -X GET "$BASE_URL?travelers=2" -H "$CONTENT_TYPE_HEADER" -v

 echo "\n--- Prueba filtrando por 5 viajeros ---"
 curl -X GET "$BASE_URL?travelers=5" -H "$CONTENT_TYPE_HEADER" -v

 echo "\n--- Prueba filtrando por 6 viajeros (límite máximo) ---"
 curl -X GET "$BASE_URL?travelers=6" -H "$CONTENT_TYPE_HEADER" -v

 echo "\n--- Prueba filtrando por 7 viajeros (fuera del límite) ---"
 curl -X GET "$BASE_URL?travelers=7" -H "$CONTENT_TYPE_HEADER" -v

 echo "\n--- Prueba con un número de viajeros no válido (-1) ---"
 curl -X GET "$BASE_URL?travelers=-1" -H "$CONTENT_TYPE_HEADER" -v

 echo "\n--- Prueba con un parámetro inexistente (no debería filtrar nada) ---"
 curl -X GET "$BASE_URL?precio=100000" -H "$CONTENT_TYPE_HEADER" -v

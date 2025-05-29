#!/bin/bash

# URL del servidor
URL="http://localhost:3000/user/67ed5884c70a54885c736530/posts"



# Token de autorización 
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2VkNTg4NGM3MGE1NDg4NWM3MzY1MmIiLCJpYXQiOjE3NDQwMTc0MzYsImV4cCI6MTc0NDAyMTAzNn0.oNH94_nxzxxClADsjvZDVhqcH7M-5c4EAkCL5qyG0uU"

# Enviar la solicitud POST
curl -X GET $URL -H "Authorization: Bearer $TOKEN" -v

# Pausar la terminal para que puedas ver la salida
echo "Presiona cualquier tecla para cerrar..."
read -n 1
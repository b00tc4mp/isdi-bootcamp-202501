#!/bin/bash

# URL del servidor
URL="http://localhost:3000/posts"



# Token de autorización 
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2UwNjc5MWE1NWRlYzhiYzlmZmQ2MTYiLCJpYXQiOjE1MTYyMzkwMjJ9.KE145FZBnQ-kUB4E1ZDU089XCcS6k3JOQQXevr62M8s"

# Enviar la solicitud POST
curl -X GET $URL -H "Authorization: Bearer $TOKEN" -v

# Pausar la terminal para que puedas ver la salida
echo "Presiona cualquier tecla para cerrar..."
read -n 1
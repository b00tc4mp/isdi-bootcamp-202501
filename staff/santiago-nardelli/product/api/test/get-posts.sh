#!/bin/bash

# URL del servidor
URL="http://localhost:3000/posts"



# Token de autorización 
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2VkMTllY2MzMjk1ZWY4YWI4OGQ5NGIiLCJpYXQiOjE3NDM1OTIwNjQsImV4cCI6MTc0MzU5NTY2NH0.mEndEcHyw5qYUQwr1SbDd2Gbx4Fk1yUidUz7VAN5Bgk"

# Enviar la solicitud POST
curl -X GET $URL -H "Authorization: Bearer $TOKEN" -v

# Pausar la terminal para que puedas ver la salida
echo "Presiona cualquier tecla para cerrar..."
read -n 1
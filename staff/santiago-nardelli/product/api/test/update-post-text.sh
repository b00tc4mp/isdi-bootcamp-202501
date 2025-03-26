#!/bin/bash

URL="http://localhost:3000/posts/67e315394d855460c56a0fa9/title"
AUTH="Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2UwNjc5MWE1NWRlYzhiYzlmZmQ2MTYiLCJpYXQiOjE1MTYyMzkwMjJ9.KE145FZBnQ-kUB4E1ZDU089XCcS6k3JOQQXevr62M8s"
CONTENT_TYPE="Content-type: application/json"
DATA='{"title":"messi es pa vo y pa mi"}'

curl -X PATCH "$URL" -H "$AUTH" -H "$CONTENT_TYPE" -d "$DATA" -v

# Pausar la terminal para que puedas ver la salida
echo "Presiona cualquier tecla para cerrar..."
read -n 1
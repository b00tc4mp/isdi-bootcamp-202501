#!/bin/bash

# URL del servidor
URL="http://localhost:3000/posts"

# Datos del post en formato JSON
DATA='{
  "image":"https://media.giphy.com/media/26Ff3LG9jN1BGFm4U/giphy.gif?cid=ecf05e4715ujpq6g06w8mlob85qv0ord11x6su4gr50xbiw4&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  "text": "God move over"
}'

# Token de autorización (reemplaza con un token válido)
TOKEN="m88twjau-012fwytt1ex2e"

# Enviar la solicitud POST
curl -X POST $URL \
     -H "Content-Type: application/json" \
     -H "Authorization: $TOKEN" \
     -d "$DATA"
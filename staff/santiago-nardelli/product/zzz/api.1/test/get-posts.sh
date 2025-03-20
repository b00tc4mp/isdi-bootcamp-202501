#!/bin/bash

# URL del servidor
URL="http://localhost:3000/posts"



# Token de autorización 
TOKEN="m88twjau-012fwytt1ex2e"

# Enviar la solicitud POST
curl -X GET $URL -H "Authorization: $TOKEN" -v
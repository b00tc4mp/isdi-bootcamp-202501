

# URL del servidor
URL="http://localhost:3000/posts"

# Datos del post en formato JSON
DATA='{
  "image": "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm9sdnliZGh3eGJxMjg2dHlyMXBid2d3cXVzamFxMm5taXI4dGNnbCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JBjboimLcWFukn5JTT/giphy.gif",
  "title": "Si atletico de madrid gana la liga, me rapo la cabeza"
}'

# Token de autorización (reemplaza con un token válido) es el token de la cuenta de usuario
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2U2ZjM3NDIxOWNmZTcxMzE0ZTY4MTQiLCJpYXQiOjE1MTYyMzkwMjJ9.LSvV5ywMkFfsxTUsHagVIKjus0XJmzcUlzoPGTSycqg"

# Enviar la solicitud POST
curl -X POST $URL \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -d "$DATA" -v

     # Pausar la terminal para que puedas ver la salida
echo "Presiona cualquier tecla para cerrar..."
read -n 1
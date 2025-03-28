curl -X POST http://localhost:3000/user/register  -H 'Content-Type: application/json' -d '{"name":"Lionel Messi","email":"lio@messi.com", "password":"123456"}' -v

# Pausar la terminal para que puedas ver la salida
echo "Presiona cualquier tecla para cerrar..."
read -n 1
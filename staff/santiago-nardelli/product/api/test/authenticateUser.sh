


# Store the URL and data in variables for better readability and maintainability
URL="http://localhost:3000/user/auth"
DATA='{"email":"diego@maradona.com","password":"123123123"}'

# Use the variables in the curl command
curl -X POST "$URL" -H 'Content-Type: application/json' -d "$DATA" -v

# Pausar la terminal para que puedas ver la salida
echo "Presiona cualquier tecla para cerrar..."
read -n 1
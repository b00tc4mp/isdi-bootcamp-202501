


# Store the URL and data in variables for better readability and maintainability
URL="http://localhost:3000/user/auth"
DATA='{"email":"test@test.com","password":"test"}'

# Use the variables in the curl command
curl -X GET "$URL" -H 'Content-Type: application/json' -d "$DATA" -v
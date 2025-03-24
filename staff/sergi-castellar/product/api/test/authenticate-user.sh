curl -X POST http://localhost:8080/users/auth \
    -H 'Content-type: application/json' \
    -d '{
    "username":"sergi",
    "password":"123456"
    }' -v
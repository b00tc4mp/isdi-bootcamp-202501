curl -X POST http://localhost:8080/users/auth \
    -H 'Content-type: application/json' \
    -d '{
    "username":"macarena",
    "password":"12345678"
    }' -v
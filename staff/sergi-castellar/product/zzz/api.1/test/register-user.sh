curl -X POST http://localhost:8080/users \
    -H 'Content-type: application/json' \
    -d '{
    "name":"sergi",
    "email":"sergi@gmail.com",
    "username":"sergi",
    "password":"123456"
    }' -v
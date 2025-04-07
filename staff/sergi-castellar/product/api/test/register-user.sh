curl -X POST http://localhost:8080/users \
    -H 'Content-type: application/json' \
    -d '{
    "name":"Prueba",
    "email":"prueba@gmail.com",
    "username":"prueba",
    "password":"123456"
    }' -v
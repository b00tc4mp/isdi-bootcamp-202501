curl -X POST http://localhost:8080/users/auth \
    -H 'Content-type: application/json' \
    -d '{
        "email":"elefante@esmeralda.com", 
        "password":"123123aa"}' \
    -v

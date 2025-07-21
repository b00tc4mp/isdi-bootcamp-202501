curl -X POST http://localhost:8080/users \
    -H 'Content-type: application/json' \
    -d '{
        "name":"Sara Fernandez",
        "username":"FerSara",
        "password":"123123aa",
        "email":"sara@fernandez.com"
        }' \
    -v


curl -X POST http://localhost:8080/users \
    -H 'Content-type: application/json' \
    -d '{
            "alias":"lucho",
            "email":"lu@cho.com",
            "password":"alalal"
        }' -v
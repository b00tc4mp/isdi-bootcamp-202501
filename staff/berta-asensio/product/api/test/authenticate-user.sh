curl -X POST http://localhost:8080/users/auth \
    -H 'Content-type: application/json' \
    -d '{ "username":"DonnyDuck", "password":"123123aa" }' \
    -v
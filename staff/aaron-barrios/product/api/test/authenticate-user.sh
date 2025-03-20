curl -X POST http://localhost:8080/users/auth \
    -H 'Content-type: application/json' \
    -d '{"username":"john","password":"jojojo"}' -v